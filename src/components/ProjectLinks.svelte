<script lang="ts">
    export let projectData: any;
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
    isHomepageLive = homepageUrl ? isLive(homepageUrl) : null;
</script>
{#if githubUrl}
    <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
             style="width: 20px; height: 20px;">
  <path fill-rule="evenodd" d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z" clip-rule="evenodd" />
        </svg>
&nbsp;<a href={githubUrl} target="_blank" rel="noopener noreferrer">{githubUrl}</a>
            <div class="badge" title="Stars">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width: 10px; height: 10px;">
  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
</svg>{projectData.extendedData.stars}
            </div>
            <div class="badge" title="Forks">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width: 10px; height: 10px;">
  <path fill-rule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clip-rule="evenodd" />
</svg>
{projectData.extendedData.forks}
            </div>
        </div>
{/if}
{#if homepageUrl}
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
             style="width: 20px; height: 20px;">
            <path fill-rule="evenodd"
                  d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z"
                  clip-rule="evenodd"></path>
        </svg>
&nbsp;<a href={homepageUrl} target="_blank" rel="noopener noreferrer">{homepageUrl}</a>
            {#await isHomepageLive then onlineStatus}
                {#if onlineStatus}
                    <div class="badge success">Online</div>
                {:else}
                    <div class="badge error">Offline</div>
                {/if}
            {/await}
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
</style>