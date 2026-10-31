# arieltapia-com

## GitHub: siempre la cuenta `arieltapia16`

Todo lo que toque GitHub en este repo se hace con la cuenta **arieltapia16**, nunca con `arieltapiagm2`:

- **Commits**: autor `Ariel Tapia <arieltapia16@gmail.com>`. Está fijado en la config local del repo (`git config user.name` / `user.email`), no hace falta pasarlo a mano. Si por algún motivo no está, usar `git -c user.name="Ariel Tapia" -c user.email="arieltapia16@gmail.com"`.
- **Push / PRs / `gh`**: antes de pushear o usar `gh`, verificar que la cuenta activa sea `arieltapia16` con `gh auth status`. Si no lo es, cambiar con `gh auth switch -u arieltapia16`. Las credenciales de git salen de `gh auth git-credential`, así que la cuenta activa de `gh` es la que firma el push.
- El remoto es `https://github.com/arieltapia16/arieltapia-com.git`.

## Flujo

- Se trabaja directo en `main`; un push a `main` ya es el merge y dispara el deploy en Vercel.
