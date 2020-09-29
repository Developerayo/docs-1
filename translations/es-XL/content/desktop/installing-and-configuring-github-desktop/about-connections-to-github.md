---
title: Acerca de las conexiones a GitHub
intro: '{{ site.data.variables.product.prodname_desktop }} utiliza HTTPS para intercambiar datos de forma segura con {{ site.data.variables.product.prodname_dotcom }}.'
redirect_from:
  - /desktop/getting-started-with-github-desktop/about-connections-to-github
versions:
  free-pro-team: '*'
---

{{ site.data.variables.product.prodname_desktop }} se conecta a {{ site.data.variables.product.prodname_dotcom }} cuando extraes, subes, clonas y bifurcas repositorios remotos. Para conectarse a {{ site.data.variables.product.prodname_dotcom }} desde {{ site.data.variables.product.prodname_desktop }}, debes autenticar tu cuenta. Para obtener más información, consulta "[Autenticar a {{ site.data.variables.product.prodname_dotcom }}](/desktop/getting-started-with-github-desktop/authenticating-to-github)."

Después de que te autentiques en {{ site.data.variables.product.prodname_dotcom }}, puedes conectarte a los repositorios remotos con {{ site.data.variables.product.prodname_desktop }}. {{ site.data.variables.product.prodname_desktop }} guarda tus credenciales en caché (nombre de usuario y contraseña o token de acceso personal) y las utiliza para autenticarse en cada conexión hacia el destino remoto.

{{ site.data.variables.product.prodname_desktop }} se conecta con {{ site.data.variables.product.prodname_dotcom }} utilizando HTTPS. Si utilizas {{ site.data.variables.product.prodname_desktop }} para acceder a los repositorios que se clonaron utilizando SSH, podrías encontrar errores. Para conectarte a un repositorio que se clonó utilizando SSH, cambia las URL del destino remoto. Para obtener más información, consulta "[Changing a remote's URL](/github/using-git/changing-a-remotes-url) (Cambiar la URL de un remoto).

### Leer más
- "[Clonar y bifurcar repositorios desde GitHub Desktop](/desktop/contributing-and-collaborating-using-github-desktop/cloning-and-forking-repositories-from-github-desktop)"