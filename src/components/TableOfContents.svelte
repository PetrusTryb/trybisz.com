<script lang="ts">
  import type { MarkdownHeading } from "astro";

  export let headings: MarkdownHeading[] = [];

  import Dropdown from "./Dropdown.svelte";
</script>

<Dropdown shortcut="C">
    <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
      <title>Table of contents (Shift + c)</title>
  <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
</svg>
  <ul>
    {#each headings.filter(({ depth }) => depth <= 3) as { slug, text, depth }}
      <li>
        <a href="#{slug}" style="margin-left: {depth*5}px;">{text}</a>
      </li>
    {/each}
  </ul>
</Dropdown>

<style>
  ul {
    position: absolute;
    border: var(--standard-border);
    background-color: var(--background-color);
    inset-block-start: var(--nav-height);
    margin: 0;
    padding: 0;
    list-style: none;
    inset-inline-end: 0;
    max-block-size: calc(120vh - var(--nav-height) * 2);
    overflow-y: auto;
  }

  a {
    display: block;
    padding-inline: var(--size-3);
    padding-block: var(--size-1);
  }
</style>
