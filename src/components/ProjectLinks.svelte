<script lang="ts">
    export let projectData: any;
    export let linksType: "text"|"buttons" = "text";
    async function isLive(url: string):Promise<boolean>{
        try {
            await fetch(url, {mode: 'no-cors'});
            return true;
        } catch (error) {
            return false;
        }
    }
    let githubUrl;
    let homepageUrl;
    let isHomepageLive;
    githubUrl = projectData?.extendedData ? projectData?.url : null;
    homepageUrl = projectData?.extendedData?.homepage || (!githubUrl ? projectData?.url : null);
    isHomepageLive = (homepageUrl&&linksType==="text") ? isLive(homepageUrl) : null;
</script>
{#if linksType==="text"}
{#if githubUrl}
    <div>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer"><img src="/GitHub-Mark-Light-32px.png" alt="GitHub">{githubUrl.replace("https://github.com","")}</a>
        {#if projectData.extendedData.stars!==undefined && projectData.extendedData.forks!==undefined}
            <div class="badge" title="Stars">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
</svg>{projectData.extendedData.stars}
            </div>
            <div class="badge" title="Forks">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path fill-rule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clip-rule="evenodd" />
</svg>
{projectData.extendedData.forks}
            </div>
            {:else}
            <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
</svg>Failed to fetch repository data</div>
            {/if}
        </div>
{/if}
{#if homepageUrl}
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd"
                  d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z"
                  clip-rule="evenodd"></path>
        </svg><a href={homepageUrl} target="_blank" rel="noopener noreferrer">{homepageUrl}</a>
            {#await isHomepageLive then onlineStatus}
                {#if onlineStatus}
                    <div class="badge success">Online</div>
                {:else}
                    <div class="badge error">Offline</div>
                {/if}
            {/await}
        </div>
{/if}
    {:else}
    <div class="button-links">
    {#if githubUrl}
<a href={githubUrl} target="_blank" rel="noopener noreferrer"><button><img src="/GitHub-Mark-Light-32px.png" alt="GitHub">GitHub</button></a>
{/if}
{#if homepageUrl}
<a href={homepageUrl} target="_blank" rel="noopener noreferrer"><button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd"
                  d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z"
                  clip-rule="evenodd"></path>
        </svg>Website</button></a>
    {/if}
    </div>
{/if}
<style>
    .badge {
        display: inline-block;
        padding: 0 10px;
        margin-left: 5px;
        border-radius: 126px;
        font-size: smaller;
        border: 1px solid black;
        background-color: #00000099;
        color: yellow;
    }
    .success {
         border: 1px solid lime;
         background-color: #00dd0099;
    }
    .error {
        border: 1px solid red;
        background-color: #dd000099;
    }
    .button-links {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }
    .button-links > a, button {
        width: 100%;
    }
    .button-links > a:hover {
        scale: 1.1;
    }
    .button-links > a:nth-child(2){
        margin-left: 3px;
    }
    svg, img{
        width: 16px;
        height: 16px;
        margin-right: 3px;
        display: inline;
    }
    .badge>svg{
        width: 10px;
        height: 10px;
    }
</style>