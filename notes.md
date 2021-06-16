## questions
  - [x] was there a reason we wanted to separate out the API and Guides website?
    - a lot of the formatting from typedoc gets lost in conversion to markdown

## todos
  - api docs should use `v2` in its url path so we can multi-version docs in the future

## approach ideas
- generating the docs
  - combine generated docs
    - we run typedoc in each package and move each directory into the website directory
      - we can customize our own theme (https://typedoc.org/guides/themes) so pass in `--theme ../../website/typedoc-theme` to each script
      - specify output as `docs/package-name`
    - move all of the generated docs `packages/*/docs/*/` to `website/docs/v2/*`
    - index page of api
      - examples:
        - cypress: https://docs.cypress.io/api/table-of-contents - has a table of contents
        - ember: https://api.emberjs.com/ember/release - has a introduction page
      - create a page for `frontside.com/effection/api/`
        - has sidebar that should be automatically generated?

- when and how should it build and deploy?
  - since netlify runs a command and then deploys, we should generate typedocs each time (as opposed to trying to insert logic on whether or not it should); it will run typedocs twice: when a feature PR is merged and when the changeset Version Packages PR is merged
    - we could possibly disable deploying on branches and switch over to using build hooks create a new workflow to run only when a version packages PR is merged
    