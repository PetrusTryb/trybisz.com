import { defineMiddleware } from "astro/middleware";
import { getEntryBySlug } from "astro:content";

async function getProject(slug:string) {
  let project = await getEntryBySlug("projects", slug);
  console.log("getProject", slug, project!=null);
  if(project?.data.url?.match(/^https:\/\/github.com\/\w+\/[\w-_.]+$/)){
      let response = await fetch(project.data.url.replace("github.com", "api.github.com/repos"));
      if(!response.ok){
          console.log("GitHub project fetch failed", response.status);
          return project;
      }
      console.log("GitHub project fetch OK");
      let data = await response.json();
      if(project.data.shortDescription === undefined) project.data.shortDescription = data.description;
      project.data.tags = [...new Set([...project.data.tags||[], ...data.topics])];
      project.data.publicationDate = new Date(data.pushed_at);
      project.data.extendedData = {
            stars: data.stargazers_count,
            forks: data.forks,
            homepage: data.homepage
      }
      if(project?.body.length>0) return project;
      const readme = await fetch(`https://raw.githubusercontent.com/${data.full_name}/${data.default_branch}/README.md`);
      if(!readme.ok) return project;
      console.log("GitHub project README fetch OK");
      project.body = await readme.text();
      return project;
  }
  else{
      console.log("Not a GitHub project");
      return project;
  }
}

export const onRequest = defineMiddleware((context, next) => {
    context.locals.getProject = getProject;
    return next();
});