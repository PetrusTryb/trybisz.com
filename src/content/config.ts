import {z, defineCollection, getEntryBySlug} from "astro:content";
import 'dotenv/config';

export const collections = {
  projects: defineCollection({
    schema: ({ image }) => z.object({
      cover: image().refine((img) => img.width >= 500, {
        message: "Cannot Determine file to upload - must be at least 500px wide",
      }).optional(),
      title: z.string().max(120),
      publicationDate: z.date(),
      published: z.boolean(),
      url: z.string().max(150).optional(),
      shortDescription: z.string().max(1000).optional(), // If repo provided, this can be fetched automatically
      tags: z.array(z.string()).max(120).optional(), // Read in the file if not GitHub URL provided
      extendedData: z.object({
        homepage: z.string().optional(),
        stars: z.number().optional(),
        forks: z.number().optional(),
      }).optional() // Used only if GitHub URL provided, filled in automatically
    })
  }),
};

export async function getProject(slug: string, withReadme: boolean=true) {
    let project = await getEntryBySlug("projects", slug);
    console.log("getProject", slug, project != null);
    if (project?.data.url?.match(/^https:\/\/github.com\/\w+\/[\w-_.]+$/)) {
        let response = await fetch(project.data.url.replace("github.com", "api.github.com/repos"), {
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": "Bearer " + process.env.GITHUB_TOKEN
            }
        });
        if (!response.ok) {
            console.log("GitHub project fetch failed", response.status);
            project.data.extendedData = {};
            return project;
        }
        console.log("GitHub project fetch OK");
        let data = await response.json();
        if (project.data.shortDescription === undefined) project.data.shortDescription = data.description;
        project.data.tags = [...new Set([...project.data.tags || [], ...data.topics])];
        project.data.publicationDate = new Date(data.pushed_at);
        project.data.extendedData = {
            stars: data.stargazers_count,
            forks: data.forks,
            homepage: data.homepage
        }
        if (project?.body.length > 0 || !withReadme) return project;
        const readme = await fetch(`https://raw.githubusercontent.com/${data.full_name}/${data.default_branch}/README.md`);
        if (!readme.ok) {
            console.log("GitHub project README fetch failed", readme.status);
            project.body = "<p style='color:red;'>Failed to fetch README.md</p>";
            return project;
        }
        console.log("GitHub project README fetch OK");
        project.body = await readme.text();
        return project;
    } else {
        console.log("Not a GitHub project");
        return project;
    }
}