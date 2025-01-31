Configuring projects with vercel.json
Learn how to use vercel.json to configure and override the default behavior of Vercel from within your project.
Table of Contents
The vercel.json configuration file lets you configure, and override the default behavior of Vercel from within your project. This includes settings for:

buildCommand
cleanUrls
crons
devCommand
framework
functions
headers
ignoreCommand
images
installCommand
outputDirectory
public
redirects
regions
functionFailoverRegion
rewrites
trailingSlash
To get started, create a vercel.json file in your project's root directory.

buildCommand
Type: string | null

The buildCommand property can be used to override the Build Command in the Project Settings dashboard, and the build script from the package.json file for a given deployment. For more information on the default behavior of the Build Command, visit the Configure a Build - Build Command section.

vercel.json

{
  "buildCommand": "next build"
}
This value overrides the Build Command in Project Settings.

cleanUrls
Type: Boolean.

Default Value: false.

When set to true, all HTML files and Serverless Functions will have their extension removed. When visiting a path that ends with the extension, a 308 response will redirect the client to the extensionless path.

For example, a static file named about.html will be served when visiting the /about path. Visiting /about.html will redirect to /about.

Similarly, a Serverless Function named api/user.go will be served when visiting /api/user. Visiting /api/user.go will redirect to /api/user.

vercel.json

{
  "cleanUrls": true
}
If you are using Next.js and running vercel dev, you will get a 404 error when visiting a route configured with cleanUrls locally. It does however work fine when deployed to Vercel. In the example above, visiting /about locally will give you a 404 with vercel dev but /about will render correctly on Vercel.

crons
Used to configure cron jobs for the production deployment of a project.

Type: Array of cron Object.

Limits:

A maximum of string length of 512 for the path value.
A maximum of string length of 256 for the schedule value.
Cron object definition
path - Required - The path to invoke when the cron job is triggered. Must start with /.
schedule - Required - The cron schedule expression to use for the cron job.
vercel.json

{
  "crons": [
    {
      "path": "/api/every-minute",
      "schedule": "* * * * *"
    },
    {
      "path": "/api/every-hour",
      "schedule": "0 * * * *"
    },
    {
      "path": "/api/every-day",
      "schedule": "0 0 * * *"
    }
  ]
}
devCommand
This value overrides the Development Command in Project Settings.

Type: string | null

The devCommand property can be used to override the Development Command in the Project Settings dashboard. For more information on the default behavior of the Development Command, visit the Configure a Build - Development Command section.

vercel.json

{
  "devCommand": "next dev"
}
framework
This value overrides the Framework in Project Settings.

Type: string | null

Available framework slugs:

nextjs
nuxtjs
svelte
create-react-app
gatsby
remix
solidstart
sveltekit
blitzjs
astro
hexo
eleventy
docusaurus-2
docusaurus
preact
solidstart-1
dojo
ember
vue
scully
ionic-angular
angular
polymer
sveltekit-1
ionic-react
gridsome
umijs
sapper
saber
stencil
redwoodjs
hugo
jekyll
brunch
middleman
zola
hydrogen
vite
vitepress
vuepress
parcel
fasthtml
sanity-v3
sanity
storybook
The framework property can be used to override the Framework Preset in the Project Settings dashboard. The value must be a valid framework slug. For more information on the default behavior of the Framework Preset, visit the Configure a Build - Framework Preset section.

To select "Other" as the Framework Preset, use null.

vercel.json

{
  "framework": "nextjs"
}
functions
Type: Object of key String and value Object.

Key definition
A glob pattern that matches the paths of the Serverless Functions you would like to customize:

api/*.js (matches one level e.g. api/hello.js but not api/hello/world.js)
api/**/*.ts (matches all levels api/hello.ts and api/hello/world.ts)
src/pages/**/* (matches all functions from src/pages)
api/test.js
Value definition
runtime (optional): The npm package name of a Runtime, including its version.
memory (optional): An integer defining the memory in MB for your Serverless Function (between 128 and 3009).
maxDuration (optional): An integer defining how long your Serverless Function should be allowed to run on every request in seconds (between 1 and the maximum limit of your plan, as mentioned below).
includeFiles (optional): A glob pattern to match files that should be included in your Serverless Function. If you’re using a Community Runtime, the behavior might vary. Please consult its documentation for more details. (Not supported in Next.js, instead use outputFileTracingIncludes in next.config.js )
excludeFiles (optional): A glob pattern to match files that should be excluded from your Serverless Function. If you’re using a Community Runtime, the behavior might vary. Please consult its documentation for more details. (Not supported in Next.js, instead use outputFileTracingIncludes in next.config.js )
Description
By default, no configuration is needed to deploy Serverless Functions to Vercel.

For all officially supported runtimes, the only requirement is to create an api directory at the root of your project directory, placing your Serverless Functions inside.

The functions property cannot be used in combination with builds. Since the latter is a legacy configuration property, we recommend dropping it in favor of the new one.

Because Incremental Static Regeneration (ISR) uses Serverless Functions, the same configurations apply. The ISR route can be defined using a glob pattern, and accepts the same properties as when using Serverless Functions.

When deployed, each Serverless Function receives the following properties:

Memory: 1024 MB (1 GB) - (Optional)
Maximum Duration: 10s default - 60s (Hobby), 15s default - 300s (Pro), or 15s default - 900s (Enterprise). This can be configured up to the respective plan limit) - (Optional)
To configure them, you can add the functions property.

functions property with Serverless Functions
vercel.json

{
  "functions": {
    "api/test.js": {
      "memory": 3009,
      "maxDuration": 30
    },
    "api/*.js": {
      "memory": 3009,
      "maxDuration": 30
    }
  }
}
functions property with ISR
vercel.json

{
  "functions": {
    "pages/blog/[hello].tsx": {
      "memory": 1024
    },
    "src/pages/isr/**/*": {
      "maxDuration": 10
    }
  }
}
Using unsupported runtimes
In order to use a runtime that is not officially supported, you can add a runtime property to the definition:

vercel.json

{
  "functions": {
    "api/test.php": {
      "runtime": "vercel-php@0.5.2"
    }
  }
}
In the example above, the api/test.php Serverless Function does not use one of the officially supported runtimes. In turn, a runtime property was added in order to invoke the vercel-php community runtime.

For more information on Runtimes, see the Runtimes documentation:

headers
Type: Array of header Object.

Valid values: a list of header definitions.

vercel.json

{
  "headers": [
    {
      "source": "/service-worker.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/:path*",
      "has": [
        {
          "type": "query",
          "key": "authorized"
        }
      ],
      "headers": [
        {
          "key": "x-authorized",
          "value": "true"
        }
      ]
    }
  ]
}
This example configures custom response headers for static files, Serverless Functions, and a wildcard that matches all routes.

Header object definition
Property	Description
source	A pattern that matches each incoming pathname (excluding querystring).
headers	A non-empty array of key/value pairs representing each response header.
has	An optional array of has objects with the type, key and value properties. Used for conditional path matching based on the presence of specified properties.
missing	An optional array of missing objects with the type, key and value properties. Used for conditional path matching based on the absence of specified properties.
Header has or missing object definition
Property	Type	Description
type	String	Must be either header, cookie, host, or query. The type property only applies to request headers sent by clients, not response headers sent by your functions or backends.
key	String	The key from the selected type to match against.
value	String or not defined	The value to check for, if undefined any value will match. A regex like string can be used to capture a specific part of the value, e.g. if the value first-(?<paramName>.*) is used for first-second then second will be usable in the destination with :paramName.
Learn more about rewrites on Vercel and see limitations.

ignoreCommand
This value overrides the Ignored Build Step in Project Settings.

Type: string | null

This ignoreCommand property will override the Command for Ignoring the Build Step for a given deployment. When the command exits with code 1, the build will continue. When the command exits with 0, the build is ignored. For more information on the default behavior of the Ignore Command, visit the Ignored Build Step section.

vercel.json

{
  "ignoreCommand": "git diff --quiet HEAD^ HEAD ./"
}
installCommand
This value overrides the Install Command in Project Settings.

Type: string | null

The installCommand property can be used to override the Install Command in the Project Settings dashboard for a given deployment. This setting is useful for trying out a new package manager for the project. An empty string value will cause the Install Command to be skipped. For more information on the default behavior of the install command visit the Configure a Build - Install Command section.

vercel.json

{
  "installCommand": "npm install"
}
images
The images property defines the behavior of Vercel's native Image Optimization API, which allows on-demand optimization of images at runtime.

Type: Object

Value definition
sizes - Required - Array of allowed image widths. The Image Optimization API will return an error if the w parameter is not defined in this list.
localPatterns - Allow-list of local image paths which can be used with the Image Optimization API.
remotePatterns - Allow-list of external domains which can be used with the Image Optimization API.
minimumCacheTTL - Cache duration (in seconds) for the optimized images.
qualities - Array of allowed image qualities. The Image Optimization API will return an error if the q parameter is not defined in this list.
formats - Supported output image formats. Allowed values are either "image/avif" and/or "image/webp".
dangerouslyAllowSVG - Allow SVG input image URLs. This is disabled by default for security purposes.
contentSecurityPolicy - Specifies the Content Security Policy of the optimized images.
contentDispositionType - Specifies the value of the "Content-Disposition" response header. Allowed values are "inline" or "attachment".
vercel.json

{
  "images": {
    "sizes": [256, 640, 1080, 2048, 3840],
    "localPatterns": [{
      "pathname": "^/assets/.*$",
      "search": ""
    }]
    "remotePatterns": [
      {
        "protocol": "https",
        "hostname": "example.com",
        "port": "",
        "pathname": "^/account123/.*$",
        "search": "?v=1"
      }
    ],
    "minimumCacheTTL": 60,
    "qualities": [25, 50, 75],
    "formats": ["image/webp"],
    "dangerouslyAllowSVG": false,
    "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;",
    "contentDispositionType": "inline"
  }
}
outputDirectory
This value overrides the Output Directory in Project Settings.

Type: string | null

The outputDirectory property can be used to override the Output Directory in the Project Settings dashboard for a given deployment.

In the following example, the deployment will look for the build directory rather than the default public or . root directory. For more information on the default behavior of the Output Directory see the Configure a Build - Output Directory section. The following example is a vercel.json file that overrides the outputDirectory to build:

vercel.json

{
  "outputDirectory": "build"
}
public
Type: Boolean.

Default Value: false.

When set to true, both the source view and logs view will be publicly accessible.

vercel.json

{
  "public": true
}
redirects
Type: Array of redirect Object.

Valid values: a list of redirect definitions.

Redirects examples
Some redirects and rewrites configurations can accidentally become gateways for semantic attacks. Learn how to check and protect your configurations with the Enhancing Security for Redirects and Rewrites guide.
This example redirects requests to the path /me from your site's root to the profile.html file relative to your site's root with a 307 Temporary Redirect:

vercel.json

{
  "redirects": [
    { "source": "/me", "destination": "/profile.html", "permanent": false }
  ]
}
This example redirects requests to the path /me from your site's root to the profile.html file relative to your site's root with a 308 Permanent Redirect:

vercel.json

{
  "redirects": [
    { "source": "/me", "destination": "/profile.html", "permanent": true }
  ]
}
This example redirects requests to the path /user from your site's root to the api route /api/user relative to your site's root with a 301 Moved Permanently:

vercel.json

{
  "redirects": [
    { "source": "/user", "destination": "/api/user", "statusCode": 301 }
  ]
}
This example redirects requests to the path /view-source from your site's root to the absolute path https://github.com/vercel/vercel of an external site with a redirect status of 308:

vercel.json

{
  "redirects": [
    {
      "source": "/view-source",
      "destination": "https://github.com/vercel/vercel"
    }
  ]
}
This example redirects requests to all the paths (including all sub-directories and pages) from your site's root to the absolute path https://vercel.com/docs of an external site with a redirect status of 308:

vercel.json

{
  "redirects": [
    {
      "source": "/(.*)",
      "destination": "https://vercel.com/docs"
    }
  ]
}
This example uses wildcard path matching to redirect requests to any path (including subdirectories) under /blog/ from your site's root to a corresponding path under /news/ relative to your site's root with a redirect status of 308:

vercel.json

{
  "redirects": [
    {
      "source": "/blog/:path*",
      "destination": "/news/:path*"
    }
  ]
}
This example uses regex path matching to redirect requests to any path under /posts/ that only contain numerical digits from your site's root to a corresponding path under /news/ relative to your site's root with a redirect status of 308:

vercel.json

{
  "redirects": [
    {
      "source": "/post/:path(\\d{1,})",
      "destination": "/news/:path*"
    }
  ]
}
This example redirects requests to any path from your site's root that does not start with /uk/ and has x-vercel-ip-country header value of GB to a corresponding path under /uk/ relative to your site's root with a redirect status of 307:

vercel.json

{
  "redirects": [
    {
      "source": "/:path((?!uk/).*)",
      "has": [
        {
          "type": "header",
          "key": "x-vercel-ip-country",
          "value": "GB"
        }
      ],
      "destination": "/uk/:path*",
      "permanent": false
    }
  ]
}
Using has does not yet work locally while using vercel dev, but does work when deployed.

Redirect object definition
Property	Description
source	A pattern that matches each incoming pathname (excluding querystring).
destination	A location destination defined as an absolute pathname or external URL.
permanent	An optional boolean to toggle between permanent and temporary redirect (default true). When true, the status code is 308. When false the status code is 307.
statusCode	An optional integer to define the status code of the redirect. Used when you need a value other than 307/308 from permanent, and therefore cannot be used with permanent boolean.
has	An optional array of has objects with the type, key and value properties. Used for conditional redirects based on the presence of specified properties.
missing	An optional array of missing objects with the type, key and value properties. Used for conditional redirects based on the absence of specified properties.
Redirect has or missing object definition
Property	Type	Description
type	String	Must be either header, cookie, host, or query.
key	String	The key from the selected type to match against.
value	String or not defined	The value to check for, if undefined any value will match. A regex like string can be used to capture a specific part of the value. See example.
Learn more about redirects on Vercel and see limitations.

regions
This value overrides the Serverless Function Region in Project Settings.

Type: Array of region identifier String.

Valid values: List of regions, defaults to iad1.

You can define the regions where your Serverless Functions are executed. Users on Pro and Enterprise can deploy to multiple regions. Hobby plans can select any single region. To learn more, see Configuring Regions.

Function responses can be cached in the requested regions. Selecting a Serverless Function region does not impact static files, which are deployed to every region by default.

vercel.json

{
  "regions": ["sfo1"]
}
functionFailoverRegions
Setting failover regions for Serverless Functions are available on Enterprise plans

Set this property to specify the region to which a Serverless Function should fallback when the default region(s) are unavailable.

Type: Array of region identifier String.

Valid values: List of regions.

vercel.json

{
  "functionFailoverRegions": ["iad1", "sfo1"]
}
These regions serve as a fallback to any regions specified in the regions configuration. The region Vercel selects to invoke your function depends on availability and ingress. For instance:

Vercel always attempts to invoke the function in the primary region. If you specify more than one primary region in the regions property, Vercel selects the region geographically closest to the request
If all primary regions are unavailable, Vercel automatically fails over to the regions specified in functionFailoverRegions, selecting the region geographically closest to the request
The order of the regions in functionFailoverRegions does not matter as Vercel automatically selects the region geographically closest to the request
To learn more about automatic failover for Serverless Functions, see Automatic failover. Edge Functions will automatically failover with no configuration required.

Region failover is supported with Secure Compute, see Region Failover to learn more.

rewrites
Type: Array of rewrite Object.

Valid values: a list of rewrite definitions.

Rewrites examples
Some redirects and rewrites configurations can accidentally become gateways for semantic attacks. Learn how to check and protect your configurations with the Enhancing Security for Redirects and Rewrites guide.
This example rewrites requests to the path /about from your site's root to the /about-our-company.html file relative to your site's root:

vercel.json

{
  "rewrites": [{ "source": "/about", "destination": "/about-our-company.html" }]
}
This example rewrites requests to the paths under /resize that with 2 paths levels (defined as variables width and height that can be used in the destination value) to the api route /api/sharp relative to your site's root:

vercel.json

{
  "rewrites": [
    { "source": "/resize/:width/:height", "destination": "/api/sharp" }
  ]
}
This example uses wildcard path matching to rewrite requests to any path (including subdirectories) under /proxy/ from your site's root to a corresponding path under the root of an external site https://example.com/:

vercel.json

{
  "rewrites": [
    {
      "source": "/proxy/:match*",
      "destination": "https://example.com/:match*"
    }
  ]
}
This example rewrites requests to any path from your site's root that does not start with /uk/ and has x-vercel-ip-country header value of GB to a corresponding path under /uk/ relative to your site's root:

vercel.json

{
  "rewrites": [
    {
      "source": "/:path((?!uk/).*)",
      "has": [
        {
          "type": "header",
          "key": "x-vercel-ip-country",
          "value": "GB"
        }
      ],
      "destination": "/uk/:path*"
    }
  ]
}
This example rewrites requests to the path /dashboard from your site's root that does not have a cookie with key auth_token to the path /login relative to your site's root:

vercel.json

{
  "rewrites": [
    {
      "source": "/dashboard",
      "missing": [
        {
          "type": "cookie",
          "key": "auth_token"
        }
      ],
      "destination": "/login"
    }
  ]
}
Rewrite object definition
Property	Description
source	A pattern that matches each incoming pathname (excluding querystring).
destination	A location destination defined as an absolute pathname or external URL.
permanent	A boolean to toggle between permanent and temporary redirect (default true). When true, the status code is 308. When false the status code is 307.
has	An optional array of has objects with the type, key and value properties. Used for conditional rewrites based on the presence of specified properties.
missing	An optional array of missing objects with the type, key and value properties. Used for conditional rewrites based on the absence of specified properties.
Rewrite has or missing object definition
Property	Type	Description
type	String	Must be either header, cookie, host, or query.
key	String	The key from the selected type to match against.
value	String or not defined	The value to check for, if undefined any value will match. A regex like string can be used to capture a specific part of the value, e.g. if the value first-(?<paramName>.*) is used for first-second then second will be usable in the destination with :paramName.
The source property should NOT be a file because precedence is given to the filesystem prior to rewrites being applied. Instead, you should rename your static file or Serverless Function.

Using has does not yet work locally while using vercel dev, but does work when deployed.

Learn more about rewrites on Vercel.

trailingSlash
Type: Boolean.

Default Value: undefined.

false
When trailingSlash: false, visiting a path that ends with a forward slash will respond with a 308 status code and redirect to the path without the trailing slash.

For example, the /about/ path will redirect to /about.

vercel.json

{
  "trailingSlash": false
}
true
When trailingSlash: true, visiting a path that does not end with a forward slash will respond with a 308 status code and redirect to the path with a trailing slash.

For example, the /about path will redirect to /about/.

However, paths with a file extension will not redirect to a trailing slash.

For example, the /about/styles.css path will not redirect, but the /about/styles path will redirect to /about/styles/.

vercel.json

{
  "trailingSlash": true
}
undefined
When trailingSlash: undefined, visiting a path with or without a trailing slash will not redirect.

For example, both /about and /about/ will serve the same content without redirecting.

This is not recommended because it could lead to search engines indexing two different pages with duplicate content.

Legacy
Legacy properties are still supported for backwards compatibility, but are deprecated.

name
The name property has been deprecated in favor of Project Linking, which allows you to link a Vercel project to your local codebase when you run vercel.

Type: String.

Valid values: string name for the deployment.

Limits:

A maximum length of 52 characters
Only lower case alphanumeric characters or hyphens are allowed
Cannot begin or end with a hyphen, or contain multiple consecutive hyphens
The prefix for all new deployment instances. Vercel CLI usually generates this field automatically based on the name of the directory. But if you'd like to define it explicitly, this is the way to go.

The defined name is also used to organize the deployment into a project.

vercel.json

{
  "name": "example-app"
}
version
The version property should not be used anymore.

Type: Number.

Valid values: 1, 2.

Specifies the Vercel Platform version the deployment should use.

vercel.json

{
  "version": 2
}
alias
The alias property should not be used anymore. To assign a custom Domain to your project, please define it in the Project Settings instead. Once your domains are, they will take precedence over the configuration property.

Type: Array or String.

Valid values: domain names (optionally including subdomains) added to the account, or a string for a suffixed URL using .vercel.app or a Custom Deployment Suffix (available on the Enterprise plan).

Limit: A maximum of 64 aliases in the array.

The alias or aliases are applied automatically using Vercel for GitHub, Vercel for GitLab, or Vercel for Bitbucket when merging or pushing to the Production Branch.

You can deploy to the defined aliases using Vercel CLI by setting the production deployment environment target.

vercel.json

{
  "alias": ["my-domain.com", "my-alias"]
}
scope
The scope property has been deprecated in favor of Project Linking, which allows you to link a Vercel project to your local codebase when you run vercel.

Type: String.

Valid values: For teams, either an ID or slug. For users, either a email address, username, or ID.

This property determines the scope (Hobby team or team) under which the project will be deployed by Vercel CLI.

It also affects any other actions that the user takes within the directory that contains this configuration (e.g. listing environment variables using vercel secrets ls).

vercel.json

{
  "scope": "my-team"
}
Deployments made through Git will ignore the scope property because the repository is already connected to project.

env
We recommend against using this property. To add custom environment variables to your project define them in the Project Settings.

Type: Object of String keys and values.

Valid values: environment keys and values.

Environment variables passed to the invoked Serverless Functions.

This example will pass the MY_KEY static env to all Serverless Functions and the SECRET resolved from the my-secret-name secret dynamically.

vercel.json

{
  "env": {
    "MY_KEY": "this is the value",
    "SECRET": "@my-secret-name"
  }
}
build.env
We recommend against using this property. To add custom environment variables to your project define them in the Project Settings.

Type: Object of String keys and values inside the build Object.

Valid values: environment keys and values.

Environment variables passed to the Build processes.

The following example will pass the MY_KEY environment variable to all Builds and the SECRET resolved from the my-secret-name secret dynamically.

vercel.json

{
  "env": {
    "MY_KEY": "this is the value",
    "SECRET": "@my-secret-name"
  }
}
builds
We recommend against using this property. To customize Serverless Functions, please use the functions property instead. If you'd like to deploy a monorepo, see the Monorepo docs.

Type: Array of build Object.

Valid values: a list of build descriptions whose src references valid source files.

Build object definition
src (String): A glob expression or pathname. If more than one file is resolved, one build will be created per matched file. It can include * and **.
use (String): An npm module to be installed by the build process. It can include a semver compatible version (e.g.: @org/proj@1).
config (Object): Optionally, an object including arbitrary metadata to be passed to the Builder.
The following will include all HTML files as-is (to be served statically), and build all Python files and JS files into Serverless Functions:

vercel.json

{
  "builds": [
    { "src": "*.html", "use": "@vercel/static" },
    { "src": "*.py", "use": "@vercel/python" },
    { "src": "*.js", "use": "@vercel/node" }
  ]
}
When at least one builds item is specified, only the outputs of the build processes will be included in the resulting deployment as a security precaution. This is why we need to allowlist static files explicitly with @vercel/static.

routes
We recommend using cleanUrls, trailingSlash, redirects, rewrites, and/or headers instead.

The routes property is only meant to be used for advanced integration purposes, such as the Build Output API, and cannot be used in conjunction with any of the properties mentioned above.

See the upgrading routes section to learn how to migrate away from this property.

Type: Array of route Object.

Valid values: a list of route definitions.

Route object definition
src: A PCRE-compatible regular expression that matches each incoming pathname (excluding querystring).
methods: A set of HTTP method types. If no method is provided, requests with any HTTP method will be a candidate for the route.
dest: A destination pathname or full URL, including querystring, with the ability to embed capture groups as $1, $2…
headers: A set of headers to apply for responses.
status: A status code to respond with. Can be used in tandem with Location: header to implement redirects.
continue: A boolean to change matching behavior. If true, routing will continue even when the src is matched.
has: An optional array of has objects with the type, key and value properties. Used for conditional path matching based on the presence of specified properties
missing: An optional array of missing objects with the type, key and value properties. Used for conditional path matching based on the absence of specified properties
Routes are processed in the order they are defined in the array, so wildcard/catch-all patterns should usually be last.

This example configures custom routes that map to static files and Serverless Functions:

vercel.json

{
  "routes": [
    {
      "src": "/redirect",
      "status": 308,
      "headers": { "Location": "https://example.com/" }
    },
    {
      "src": "/custom-page",
      "headers": { "cache-control": "s-maxage=1000" },
      "dest": "/index.html"
    },
    { "src": "/api", "dest": "/my-api.js" },
    { "src": "/users", "methods": ["POST"], "dest": "/users-api.js" },
    { "src": "/users/(?<id>[^/]*)", "dest": "/users-api.js?id=$id" },
    { "src": "/legacy", "status": 404 },
    { "src": "/.*", "dest": "https://my-old-site.com" }
  ]
}
Upgrading legacy routes
In most cases, you can upgrade legacy routes usage to the newer rewrites, redirects, headers, cleanUrls or trailingSlash properties.

Here are some examples that show how to upgrade legacy routes to the equivalent new property.

Route Parameters
With routes, you use a PCRE Regex named group to match the ID and then pass that parameter in the query string. The following example matches a URL like /product/532004 and proxies to /api/product?id=532004:

vercel.json

{
  "routes": [{ "src": "/product/(?<id>[^/]+)", "dest": "/api/product?id=$id" }]
}
With rewrites, named parameters are automatically passed in the query string. The following example is equivalent to the legacy routes usage above, but uses rewrites instead:

vercel.json

{
  "rewrites": [{ "source": "/product/:id", "destination": "/api/product" }]
}
Legacy redirects
With routes, you specify the status code to use a 307 Temporary Redirect. Also, this redirect needs to be defined before other routes. The following example redirects all paths in the posts directory to the blog directory, but keeps the path in the new location:

vercel.json

{
  "routes": [
    {
      "src": "/posts/(.*)",
      "headers": { "Location": "/blog/$1" },
      "status": 307
    }
  ]
}
With redirects, you disable the permanent property to use a 307 Temporary Redirect. Also, redirects are always processed before rewrites. The following example is equivalent to the legacy routes usage above, but uses redirects instead:

vercel.json

{
  "redirects": [
    {
      "source": "/posts/:id",
      "destination": "/blog/:id",
      "permanent": false
    }
  ]
}
Legacy SPA Fallback
With routes, you use "handle": "filesystem" to give precedence to the filesystem and exit early if the requested path matched a file. The following example will serve the index.html file for all paths that do not match a file in the filesystem:

vercel.json

{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
With rewrites, the filesystem check is the default behavior. If you want to change the name of files at the filesystem level, file renames can be performed during the Build Step, but not with rewrites. The following example is equivalent to the legacy routes usage above, but uses rewrites instead:

vercel.json

{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
Legacy Headers
With routes, you use "continue": true to prevent stopping at the first match. The following example adds Cache-Control headers to the favicon and other static assets:

vercel.json

{
  "routes": [
    {
      "src": "/favicon.ico",
      "headers": { "Cache-Control": "public, max-age=3600" },
      "continue": true
    },
    {
      "src": "/assets/(.*)",
      "headers": { "Cache-Control": "public, max-age=31556952, immutable" },
      "continue": true
    }
  ]
}
With headers, this is no longer necessary since that is the default behavior. The following example is equivalent to the legacy routes usage above, but uses headers instead:

vercel.json

{
  "headers": [
    {
      "source": "/favicon.ico",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31556952, immutable"
        }
      ]
    }
  ]
}
Legacy Pattern Matching
With routes, you need to escape a dot with two backslashes, otherwise it would match any character PCRE Regex. The following example matches the literal atom.xml and proxies to /api/rss to dynamically generate RSS:

vercel.json

{
  "routes": [{ "src": "/atom\\.xml", "dest": "/api/rss" }]
}
With rewrites, the . is not a special character so it does not need to be escaped. The following example is equivalent to the legacy routes usage above, but instead uses rewrites:

vercel.json

{
  "rewrites": [{ "source": "/atom.xml", "destination": "/api/rss" }]
}
Legacy Negative Lookahead
With routes, you use PCRE Regex negative lookahead. The following example proxies all requests to the /maintenance page except for /maintenance itself to avoid infinite loop:

vercel.json

{
  "routes": [{ "src": "/(?!maintenance)", "dest": "/maintenance" }]
}
With rewrites, the Regex needs to be wrapped. The following example is equivalent to the legacy routes usage above, but instead uses rewrites:

vercel.json

{
  "rewrites": [
    { "source": "/((?!maintenance).*)", "destination": "/maintenance" }
  ]
}
Legacy Case Sensitivity
With routes, the src property is case-insensitive leading to duplicate content, where multiple request paths with difference cases serve the same page.

With rewrites / redirects / headers, the source property is case-sensitive so you don't accidentally create duplicate content.

Last updated on October 18, 2024
Previous
Git Settings
