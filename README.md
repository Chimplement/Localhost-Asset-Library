# Localhost Asset Library

Localhost Asset Library is a way to easily import the reusable parts of your Godot projects to new projects. It provides a way to import your assets from the asset library, without having them be publicly available. This is done by hosting a local http server that mimics the asset libraries API and accesing it in the asset library in the Godot editor. I made this because I didn't like having to manualy open my folder with reusable code and copying it to the right place in my new project.

![example](/readme_images/example.png)

> ## How To Install
>
>1. Download and install [Node.js](https://nodejs.org).
>2. Download or clone this repository.
>3. Run the server.
>    -   On windows run `run_hidden.bat` to start the server or add a shortcut to your startup folder.
>    -   On linux or max os run `node .` in a terminal.
>4. Add url to the Godot asset store.
>    1. Open a godot project.
>    2. Go to `Editor -> Editor Settings..`.
>    3. Search for `Asset Library`.
>    4. Add an `http://127.0.0.1:7040/asset-library/api` to the `Available Urls` dictionary. The key can be what ever you want (As long as its a string) I named it "localhost", this will be the name in the AssetLib tab in Godot.

>## How To Use
>
> >### Accessing The Assets In Godot
> >
> >1. In Godot go to the `AssetLib` tab.
> >2. Click on the `site` dropdown.
> >3. Sellect the option called "localhost" or what you used as the key in the editor settings.
>
> >### Adding Assets
> >
> >1. Open the `assets` folder
> >2. Add a folder this folder will act as the catgory your asset is in e.g. "2D Tools", or open an already excisting category folder.
> >3. Create a folder in the the category folder, this folder will contain your asset and the information about your asset.
> >4.  Add a zip file containing your assets files to the folder and name it `asset.zip`.
> >5.  Add a json file to the folder and name it `data.json`. See `\assets\Example Category\Example Asset\data.json` for the contents. **note only `title` and `godot_version` are mandatory.**
> >6. Optionaly you can add a png file called `icon.png` as the icon of the asset.
> >
> > see `\assets\Example Category\Example Asset` for an example of how to add an asset.
> > If newly added assets arent apearing you might need to restart the http server.
>
> >### Stopping The Server
> >
> >1. Go to [http://127.0.0.1:7040](http://127.0.0.1:7040).
> >2. Click on `Stop HTTP Server`.

>## Future Plans
>
>Here are the things I plan on adding in the future.
>
>- Allow for example images to be added to an asset.
>- Add more options to the Interface page.
>- Add run files for linux and mac os.
>- Create Tutorial on my [Youtube Channel](https://www.youtube.com/channel/UCVnUJ4xuUQAG1r43Uzx3aBg)