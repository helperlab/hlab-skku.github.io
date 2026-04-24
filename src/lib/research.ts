import { BASE_PATH } from "@/lib/constants";
import researchAreasData from "@/data/research-areas.json";

// 프로젝트 파일들 import
import smartFarmAi from "@/data/projects/robot_ai/smart_farm_ai.json";
import robotWbc from "@/data/projects/robot_ai/robot_wbc.json";
import elderSmartWalker from "@/data/projects/assist_ai/elder_smart_walker.json";
import strokeRehab from "@/data/projects/assist_ai/stroke_rehab.json";
import strokeRecoverPattern from "@/data/projects/assist_ai/stroke_recover_pattern.json";
import childAdhd from "@/data/projects/health_ai/child_adhd.json";
import constrHealth from "@/data/projects/health_ai/constr_health.json";
import developDisorder from "@/data/projects/health_ai/develop_disorder.json";
import earlyDetection from "@/data/projects/health_ai/early_detection.json";
import mildCognitive from "@/data/projects/health_ai/mild_cognitive.json";

const projectMap: Record<string, any> = {
    "projects/robot_ai/smart_farm_ai.json": smartFarmAi,
    "projects/robot_ai/robot_wbc.json": robotWbc,
    "projects/assist_ai/elder_smart_walker.json": elderSmartWalker,
    "projects/assist_ai/stroke_rehab.json": strokeRehab,
    "projects/assist_ai/stroke_recover_pattern.json": strokeRecoverPattern,
    "projects/health_ai/child_adhd.json": childAdhd,
    "projects/health_ai/constr_health.json": constrHealth,
    "projects/health_ai/develop_disorder.json": developDisorder,
    "projects/health_ai/early_detection.json": earlyDetection,
    "projects/health_ai/mild_cognitive.json": mildCognitive,
};

function prefixPath(path: string): string {
    if (path.startsWith("http")) return path;
    if (path.startsWith("/")) return `${BASE_PATH}${path}`;
    return path;
}

export interface ProjectData {
    id: string;
    areaId: string;
    title: string;
    description: string;
    iconName: string;
    overview?: {
        description: string;
        images: string[];
        videos: { url: string; title?: string }[];
    };
    content?: {
        description: string;
        images: string[];
        videos: { url: string; title?: string }[];
    };
    expectedEffects?: string;
    url?: string;
}

export interface AreaData {
    id: string;
    title: string;
    iconName: string;
    iconColor: string;
    description: string;
    color: string;
    image?: string;
    video?: string;
    topics: { name: string; iconName: string }[];
    projects: ProjectData[];
}

export function getResearchAreas(): AreaData[] {
    return researchAreasData.researchAreas.map((area) => ({
        id: area.id,
        title: area.title,
        iconName: area.iconName,
        iconColor: area.iconColor,
        description: area.description,
        color: area.color,
        image: area.image ? prefixPath(area.image) : undefined,
        video: area.video || undefined,
        topics: area.topics,
        projects: area.projectFiles.map((projectFile: string) => {
            const project = projectMap[projectFile];
            if (!project) return null;
            // projectId = 파일명에서 .json 제거
            const id = projectFile.split("/").pop()!.replace(".json", "");
            return {
                id,
                areaId: area.id,
                title: project.title,
                description: project.description,
                iconName: project.iconName,
                overview: project.overview ? {
                    description: project.overview.description,
                    images: (project.overview.images || []).map(prefixPath),
                    videos: (project.overview.videos || []).map((v: any) => ({
                        ...v,
                        url: prefixPath(v.url),
                    })),
                } : undefined,
                content: project.content ? {
                    description: project.content.description,
                    images: (project.content.images || []).map(prefixPath),
                    videos: (project.content.videos || []).map((v: any) => ({
                        ...v,
                        url: prefixPath(v.url),
                    })),
                } : undefined,
                expectedEffects: project.expectedEffects,
                url: project.url || undefined,
            } as ProjectData;
        }).filter((p): p is ProjectData => p !== null),
    }));
}

export function getProject(areaId: string, projectId: string): { area: AreaData; project: ProjectData } | null {
    const areas = getResearchAreas();
    const area = areas.find((a) => a.id === areaId);
    if (!area) return null;
    const project = area.projects.find((p) => p.id === projectId);
    if (!project) return null;
    return { area, project };
}

export function getAllProjectParams(): { areaId: string; projectId: string }[] {
    const areas = getResearchAreas();
    return areas.flatMap((area) =>
        area.projects.map((project) => ({
            areaId: area.id,
            projectId: project.id,
        }))
    );
}
