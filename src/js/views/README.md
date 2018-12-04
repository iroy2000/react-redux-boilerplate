## Convention

The organization of `views` is suggested as follows:

* Folders correlate to the most significant portion of the URL to map to in case and spelling within the application, and not including the application mount point if there is one.
  * Example: if a URL named `/avengers-search/` maps to a page, then we should have a `views/avengers-search/` folder that exports a component that manages the `avengers-search` page.
    * NOTE: Due to React component naming requirements, the variable that references the "page" should always be PascalCased, e.g. avengers-search -> AvengersSearch.
* Each folder should make use of the `index.js` trick to allow importing of the folder.
* Major sub views that correlate to URLs should, if appropriate, also be organized within the parent view folder.
* Besides `index.js`, the main coordinating file should be named `View.jsx`, and this is the file that should be exported as default from `index.js`.
