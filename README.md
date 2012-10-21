# Static Templater

A [grunt][grunt]-based command line tool to render HMTL and PDF from JSON and HTML templates.
Uses [Underscore.js template][underscore-template] engine, already included with Grunt.

## Setup

1. Clone this repo :
`git clone https://github.com/dharFr/static-templater.git && cd static-templater`
2. Have a look to the `projects/sample` folder
3. Create a new folder into the `projects` one
4. Create your own `.json` and template-ready `.html` files. Save them into the new folder you just created. Take care about the folder stucture. It should be the same than the one in `projects/sample` 

```
static-templater/
|- projects/
   |- your-project/         # your project lives in his own folder
      |- data/              # contains one or more json files
      |- templates/         # contains one or more template folders
      |  |- firsttemplate/
      |  |- secondtemplate/
      |- out/               # generated from templates and data
         |- firsttemplate/
         |- secondtemplate/
```

## Tasks

### Generate HTML

**`grunt template`** will generate HTML files for each projects. Files are generated from `json` data and HTML template.

**`grunt template:projects/your-project/`** will generate HTML files for the specified sub-folder only.

### Generate PDF

**`grunt wkhtmltopdf`** will generated PDF files from generated HTML files.

**`grunt wkhtmltopdf:projects/your-project/`** will generate PDF files for the specified sub-folder only.

### Watch tasks

**`grunt watch`** watch for changes on any project an re-generate HTML and PDF files.

**`grunt watch:projects/your-project/`** watch for changes on the specified project an re-generate HTML and PDF files.

## TODOs

Add a grunt [init task][inittask] to create a new project.


[grunt]: http://gruntjs.com/
[underscore-template]: http://underscorejs.org/#template
[inittask]: https://github.com/gruntjs/grunt/blob/master/docs/api.md#gruntregisterinittask