<script lang="ts">
    export let tags: string[] = [];
</script>
<ul class="tags">
    {#each tags as tag}
        <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width: 10px; height:10px;">
  <path fill-rule="evenodd" d="M11.097 1.515a.75.75 0 01.589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 111.47.294L16.665 7.5h3.585a.75.75 0 010 1.5h-3.885l-1.2 6h3.585a.75.75 0 010 1.5h-3.885l-1.08 5.397a.75.75 0 11-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 01-1.47-.294l1.02-5.103H3.75a.75.75 0 110-1.5h3.885l1.2-6H5.25a.75.75 0 010-1.5h3.885l1.08-5.397a.75.75 0 01.882-.588zM10.365 9l-1.2 6h4.47l1.2-6h-4.47z" clip-rule="evenodd" />
</svg>{tag}</li>
    {/each}
</ul>

<style>
    .tags {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .tags > li {
        display: inline-block;
        padding: 0 10px;
        margin-right: 5px;
        border: 1px solid black;
        border-radius: 5px;
        background-color: #2d2d2d55;
        font-size: smaller;
    }
</style>