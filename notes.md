## questions
- [x] was there a reason we wanted to separate out the API and Guides website?
  - a lot of the formatting from typedoc gets lost in conversion to markdown

## todos
- [ ] create barebone index page to dynamically list the generated typedoc pages
- [ ] create script to re-locate the typedoc pages in each package
- [ ] figure out how to dynamically fill the sidebar of the index page so the packages do not need to be hard-coded in
- [ ] api docs should use `v2` in its url path so we can multi-version docs in the future

## approach ideas
- generating the docs
  - generate docs
    <!-- - we run typedoc in each package and move each directory into the website directory --> - not necessary
      - we can customize our own theme (https://typedoc.org/guides/themes) so pass in `--theme ../../website/typedoc-theme` to each script
      - we can also specify output like `docs/package-name` if it makes things easier
    <!-- - move all of the generated docs `packages/*/docs/*/` to `website/docs/v2/*` --> - not necessary
  - generate list of packages by confirming `./packages/*/docs`
    - `packages.forEach(x => x.docs && return x)`
    - there is no fs in parcel so we should generate a template file with list

  - index page of api
    - examples:
      - cypress: https://docs.cypress.io/api/table-of-contents - has a table of contents
      - ember: https://api.emberjs.com/ember/release - has a introduction page
    - create a page for `frontside.com/effection/api/`
      - has sidebar that should be automatically generated?

- when and how should it build and deploy?
  - since netlify runs a command and then deploys, we should generate typedocs each time (as opposed to trying to insert logic on whether or not it should); it will run typedocs twice: when a feature PR is merged and when the changeset Version Packages PR is merged
    - we could possibly disable deploying on branches and switch over to using build hooks create a new workflow to run only when a version packages PR is merged


## config
- just netlify.config configs = if base is set to 'website' from root, it will use the build command from the netlify config in website
  - any netlify config files in the repo will override the netlify UI
    - this means if we have netlify configs at root for api-docs and one in website for the guides, we won't be able to run build successfully for website