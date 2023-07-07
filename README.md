# Portfolio

Moje nowe portfolio, oparte na framerowku [Astro](https://astro.build/).
To już moje trzecie podejście.
Tym razem postanowiłem postawić nie tyle na prostotę edycji, jak to miało miejsce w poprzednim projekcie - [PortCMS](https://github.com/PetrusTryb/portcms), tylko na automatyzację - czyli brak konieczności (a właściwie minimalizację) ręcznych edycji.

## Jak to działa?
Wszystkie treści pojawiające się na stronie są przechowywane w plikach Markdown w folderze `src/content`.\
Folder `src/content/about` zawiera jedynie treści strony głównej - takie jak umiejętności, doświadczenie, wykształcenie, itp. - te treści muszą być edytowane ręcznie.\
W folderze `src/content/projects` znajdują się pliki z danymi projektów. Mogą one być dodawane zarówno ręcznie, jak i pobierane automatycznie z GitHuba.
Przy każdym projekcie można podać link do repozytorium, a wtedy dane będą pobierane automatycznie.

<hr/>

My new portfolio, based on the [Astro](https://astro.build/) framework.
This is my third approach.
This time I decided to focus not so much on the simplicity of editing, as it was in the previous project - [PortCMS](https://github.com/PetrusTryb/portcms), but on automation - i.e. no need (or rather minimization) of manual editing.

## How it's working?
All content appearing on the page is stored in Markdown files in the `src/content` folder.\
The `src/content/about` folder only contains homepage content - such as skills, experience, education, etc. - this content must be edited manually.\
In the `src/content/projects` folder there are project data files. They can be added manually or downloaded automatically from GitHub.
For each project, you can provide a link to the repository, and then the data will be downloaded automatically.