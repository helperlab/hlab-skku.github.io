export interface Publication {
    id: string;
    title: string;
    journal: string;
    year: string;
    url: string | null;
    type: string;
    authors: string; // Added authors field
}

const ORCID_ID = "0000-0002-5025-8785";

export async function getPublications(): Promise<Publication[]> {
    try {
        const response = await fetch(
            `https://pub.orcid.org/v3.0/${ORCID_ID}/works`,
            {
                headers: { "Accept": "application/json" },
                next: { revalidate: 3600 }
            }
        );

        if (!response.ok) throw new Error(`Failed to fetch ORCID data: ${response.status}`);

        const data = await response.json();
        const works = data.group || [];

        // 1. Initial Map & Filter by Year (Fast)
        const filteredWorks = works.map((workGroup: any) => {
            const summary = workGroup["work-summary"][0];
            const year = summary["publication-date"]?.year?.value || "Unknown Year";
            const type = summary.type;
            const journal = summary["journal-title"]?.value;
            return { summary, year, type, journal };
        }).filter((item: any) => {
            if (item.type === "preprint") return false; // Exclude preprints
            if (!item.journal) return false; // Exclude Unknown Journal
            if (item.year === "Unknown Year") return false;
            const currentYear = new Date().getFullYear();
            return parseInt(item.year) > currentYear - 6;
        }).sort((a: any, b: any) => parseInt(b.year) - parseInt(a.year));


        // 2. Fetch Details for Author Names (Slower, but limited to recent works)
        // We run these in parallel
        const publications = await Promise.all(filteredWorks.map(async (item: any) => {
            const { summary, year } = item;
            const putCode = summary["put-code"];

            let authors = "H-Lab"; // Default

            try {
                // Fetch full details for this specific work to get contributors
                const detailResponse = await fetch(
                    `https://pub.orcid.org/v3.0/${ORCID_ID}/work/${putCode}`,
                    {
                        headers: { "Accept": "application/json" },
                        next: { revalidate: 3600 }
                    }
                );

                if (detailResponse.ok) {
                    const detailData = await detailResponse.json();
                    // Try to find contributors
                    const contributors = detailData["contributors"]?.["contributor"];
                    if (Array.isArray(contributors) && contributors.length > 0) {
                        authors = contributors
                            .map((c: any) => c["credit-name"]?.value)
                            .filter(Boolean)
                            .join(", ");
                    }
                }
            } catch (err) {
                console.warn(`Failed to fetch details for work ${putCode}`, err);
            }

            // Extract Title
            const title = summary.title.title.value;

            // Extract Journal
            const journal = summary["journal-title"]?.value || "Unknown Journal";

            // Extract URL
            let url = null;
            if (summary["url"]?.value) {
                url = summary["url"].value;
            } else if (summary["external-ids"]?.["external-id"]) {
                const doi = summary["external-ids"]["external-id"].find((id: any) => id["external-id-type"] === "doi");
                if (doi) {
                    url = `https://doi.org/${doi["external-id-value"]}`;
                }
            }

            return {
                id: String(putCode),
                title,
                journal,
                year,
                url,
                type: summary.type,
                authors
            };
        }));

        return publications;

    } catch (error) {
        console.error("Error fetching ORCID publications:", error);
        return [];
    }
}
