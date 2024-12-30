Directory structure:
└── apify-apify-docs/
    ├── apify-docs-theme/
    │   ├── package.json
    │   ├── src/
    │   │   ├── roa-loader/
    │   │   │   ├── package.json
    │   │   │   └── index.js
    │   │   ├── markdown.js
    │   │   ├── theme.js
    │   │   ├── utils.js
    │   │   ├── theme/
    │   │   │   ├── SearchMetadata/
    │   │   │   │   └── index.js
    │   │   │   ├── NotFound.jsx
    │   │   │   ├── Icon/
    │   │   │   │   ├── DarkMode/
    │   │   │   │   │   └── index.jsx
    │   │   │   │   └── LightMode/
    │   │   │   │       └── index.jsx
    │   │   │   ├── NavbarItem/
    │   │   │   │   ├── NavbarNavLink.jsx
    │   │   │   │   └── ComponentTypes.jsx
    │   │   │   ├── SearchBar/
    │   │   │   │   ├── styles.css
    │   │   │   │   └── index.js
    │   │   │   ├── TOCItems/
    │   │   │   │   ├── index.jsx
    │   │   │   │   ├── Tree.jsx
    │   │   │   │   └── styles.module.css
    │   │   │   ├── MDXComponents/
    │   │   │   │   ├── Details.js
    │   │   │   │   ├── Heading.js
    │   │   │   │   ├── Code.js
    │   │   │   │   ├── Ul/
    │   │   │   │   │   ├── index.js
    │   │   │   │   │   └── styles.module.css
    │   │   │   │   ├── Img/
    │   │   │   │   │   ├── index.js
    │   │   │   │   │   └── styles.module.css
    │   │   │   │   ├── A.js
    │   │   │   │   ├── Head.js
    │   │   │   │   └── index.js
    │   │   │   ├── SearchPage/
    │   │   │   │   ├── index.js
    │   │   │   │   └── styles.module.css
    │   │   │   ├── DocSidebarItem/
    │   │   │   │   └── Link/
    │   │   │   │       ├── index.jsx
    │   │   │   │       └── styles.module.css
    │   │   │   ├── custom.css
    │   │   │   ├── RunnableCodeBlock/
    │   │   │   │   ├── RunnableCodeBlock.jsx
    │   │   │   │   └── RunnableCodeBlock.module.css
    │   │   │   ├── Navbar/
    │   │   │   │   ├── Content/
    │   │   │   │   │   ├── index.jsx
    │   │   │   │   │   └── styles.module.css
    │   │   │   │   └── MobileSidebar/
    │   │   │   │       └── PrimaryMenu/
    │   │   │   │           └── index.jsx
    │   │   │   ├── DocBreadcrumbs/
    │   │   │   │   ├── Items/
    │   │   │   │   │   └── Home/
    │   │   │   │   │       ├── index.js
    │   │   │   │   │       └── styles.module.css
    │   │   │   │   ├── index.js
    │   │   │   │   └── styles.module.css
    │   │   │   ├── ColorModeToggle/
    │   │   │   │   ├── index.jsx
    │   │   │   │   └── styles.module.css
    │   │   │   ├── Logo/
    │   │   │   │   └── index.js
    │   │   │   ├── Layout/
    │   │   │   │   └── index.jsx
    │   │   │   ├── Footer/
    │   │   │   │   ├── index.jsx
    │   │   │   │   ├── index.module.css
    │   │   │   │   └── LinkItem/
    │   │   │   │       └── index.js
    │   │   │   └── CodeThemes/
    │   │   │       ├── light.js
    │   │   │       └── dark.js
    │   │   ├── index.js
    │   │   └── config.js
    │   └── static/
    │       ├── font/
    │       │   ├── lota.woff2
    │       │   └── lota.woff
    │       ├── img/
    │       └── js/
    │           └── custom.js
    ├── .markdownlintignore
    ├── .npmrc
    ├── .github/
    │   ├── workflows/
    │   │   ├── typos-check.yaml
    │   │   ├── openapi.yaml
    │   │   ├── docs.yaml
    │   │   ├── vale.yaml
    │   │   ├── deploy.yaml
    │   │   ├── test.yaml
    │   │   ├── publish-theme.yaml
    │   │   ├── lychee.yml
    │   │   └── check-pr-title.yaml
    │   ├── styles/
    │   │   ├── Microsoft/
    │   │   │   ├── Wordiness.yml
    │   │   │   ├── Semicolon.yml
    │   │   │   ├── DateFormat.yml
    │   │   │   ├── GeneralURL.yml
    │   │   │   ├── Acronyms.yml
    │   │   │   ├── ComplexWords.yml
    │   │   │   ├── HeadingColons.yml
    │   │   │   ├── Ellipses.yml
    │   │   │   ├── Auto.yml
    │   │   │   ├── RangeTime.yml
    │   │   │   ├── We.yml
    │   │   │   ├── Adverbs.yml
    │   │   │   ├── meta.json
    │   │   │   ├── Passive.yml
    │   │   │   ├── Units.yml
    │   │   │   ├── SentenceLength.yml
    │   │   │   ├── FirstPerson.yml
    │   │   │   ├── Terms.yml
    │   │   │   ├── Ranges.yml
    │   │   │   ├── OxfordComma.yml
    │   │   │   ├── HeadingAcronyms.yml
    │   │   │   ├── Vocab.yml
    │   │   │   ├── Foreign.yml
    │   │   │   ├── Hyphens.yml
    │   │   │   ├── DateOrder.yml
    │   │   │   ├── HeadingPunctuation.yml
    │   │   │   ├── Gender.yml
    │   │   │   ├── DateNumbers.yml
    │   │   │   ├── AMPM.yml
    │   │   │   ├── Negative.yml
    │   │   │   ├── Dashes.yml
    │   │   │   ├── Headings.yml
    │   │   │   ├── GenderBias.yml
    │   │   │   ├── Accessibility.yml
    │   │   │   ├── URLFormat.yml
    │   │   │   ├── Percentages.yml
    │   │   │   ├── Spacing.yml
    │   │   │   ├── Quotes.yml
    │   │   │   ├── Ordinal.yml
    │   │   │   ├── Contractions.yml
    │   │   │   ├── Avoid.yml
    │   │   │   ├── Suspended.yml
    │   │   │   └── RangeFormat.yml
    │   │   ├── write-good/
    │   │   │   ├── Cliches.yml
    │   │   │   ├── ThereIs.yml
    │   │   │   ├── Illusions.yml
    │   │   │   ├── meta.json
    │   │   │   ├── Passive.yml
    │   │   │   ├── E-Prime.yml
    │   │   │   ├── TooWordy.yml
    │   │   │   ├── So.yml
    │   │   │   ├── Weasel.yml
    │   │   │   └── README.md
    │   │   ├── config/
    │   │   │   └── vocabularies/
    │   │   │       └── Docs/
    │   │   │           ├── accept.txt
    │   │   │           └── reject.txt
    │   │   └── Apify/
    │   │       ├── Capitalization.yml
    │   │       ├── Apify.yml
    │   │       └── Languages.yml
    │   └── CODEOWNERS
    ├── renovate.json
    ├── vale.ini
    ├── sidebars.js
    ├── tsconfig.eslint.json
    ├── sitePlugin.js
    ├── .eslintrc.json
    ├── .eslintignore
    ├── clientModule.js
    ├── nginx.conf
    ├── .markdownlint.json
    ├── tools/
    │   ├── upload_to_apiary.sh
    │   └── utils/
    │       ├── createHref.js
    │       ├── collectSlugs.js
    │       └── externalLink.js
    ├── _typos.toml
    ├── package.json
    ├── .nvmrc
    ├── apify-api/
    │   ├── docs/
    │   │   └── index.html
    │   ├── assets/
    │   ├── plugins/
    │   │   ├── decorators/
    │   │   │   ├── code-samples-decorator.js
    │   │   │   ├── client-references-links-decorator.js
    │   │   │   └── legacy-doc-url-decorator.js
    │   │   └── apify.js
    │   ├── openapi/
    │   │   ├── paths/
    │   │   │   ├── actor-builds/
    │   │   │   │   ├── actor-builds@{buildId}@abort.yaml
    │   │   │   │   ├── actor-builds@{buildId}@log.yaml
    │   │   │   │   ├── actor-builds@{buildId}.yaml
    │   │   │   │   └── actor-builds.yaml
    │   │   │   ├── webhooks/
    │   │   │   │   ├── webhooks.yaml
    │   │   │   │   ├── webhooks@{webhookId}@dispatches.yaml
    │   │   │   │   ├── webhooks@{webhookId}@test.yaml
    │   │   │   │   └── webhooks@{webhookId}.yaml
    │   │   │   ├── schedules/
    │   │   │   │   ├── schedules@{scheduleId}.yaml
    │   │   │   │   ├── schedules.yaml
    │   │   │   │   └── schedules@{scheduleId}@log.yaml
    │   │   │   ├── store/
    │   │   │   │   └── store.yaml
    │   │   │   ├── actor-tasks/
    │   │   │   │   ├── actor-tasks@{actorTaskId}@run-sync.yaml
    │   │   │   │   ├── actor-tasks@{actorTaskId}@webhooks.yaml
    │   │   │   │   ├── actor-tasks@{actorTaskId}.yaml
    │   │   │   │   ├── actor-tasks@{actorTaskId}@input.yaml
    │   │   │   │   ├── actor-tasks@{actorTaskId}@runs.yaml
    │   │   │   │   ├── actor-tasks@{actorTaskId}@run-sync-get-dataset-items.yaml
    │   │   │   │   └── actor-tasks.yaml
    │   │   │   ├── request-queues/
    │   │   │   │   ├── request-queues@{queueId}.yaml
    │   │   │   │   ├── request-queues@{queueId}@head.yaml
    │   │   │   │   ├── request-queues.yaml
    │   │   │   │   ├── request-queues@{queueId}@requests@{requestId}@lock.yaml
    │   │   │   │   ├── request-queues@{queueId}@requests.yaml
    │   │   │   │   ├── request-queues@{queueId}@head@lock.yaml
    │   │   │   │   ├── request-queues@{queueId}@requests@batch.yaml
    │   │   │   │   └── request-queues@{queueId}@requests@{requestId}.yaml
    │   │   │   ├── key-value-stores/
    │   │   │   │   ├── key-value-stores@{storeId}@keys.yaml
    │   │   │   │   ├── key-value-stores.yaml
    │   │   │   │   ├── key-value-stores@{storeId}.yaml
    │   │   │   │   └── key-value-stores@{storeId}@records@{recordKey}.yaml
    │   │   │   ├── users/
    │   │   │   │   ├── users@me@limits.yaml
    │   │   │   │   ├── users@me@usage@monthly.yaml
    │   │   │   │   ├── users@{userId}.yaml
    │   │   │   │   └── users@me.yaml
    │   │   │   ├── webhook-dispatches/
    │   │   │   │   ├── webhook-dispatches.yaml
    │   │   │   │   └── webhook-dispatches@{dispatchId}.yaml
    │   │   │   ├── logs/
    │   │   │   │   └── logs@{buildOrRunId}.yaml
    │   │   │   ├── README.md
    │   │   │   ├── datasets/
    │   │   │   │   ├── datasets.yaml
    │   │   │   │   ├── datasets@{datasetId}.yaml
    │   │   │   │   └── datasets@{datasetId}@items.yaml
    │   │   │   ├── actor-runs/
    │   │   │   │   ├── actor-runs@{runId}@abort.yaml
    │   │   │   │   ├── actor-runs@{runId}@resurrect.yaml
    │   │   │   │   ├── actor-runs@{runId}.yaml
    │   │   │   │   ├── actor-runs@{runId}@charge.yaml
    │   │   │   │   ├── actor-runs@{runId}@metamorph.yaml
    │   │   │   │   ├── actor-runs.yaml
    │   │   │   │   └── actor-runs@{runId}@reboot.yaml
    │   │   │   └── actors/
    │   │   │       ├── acts@{actorId}@versions@{versionNumber}@env-vars.yaml
    │   │   │       ├── acts@{actorId}@versions@{versionNumber}@env-vars@{envVarName}.yaml
    │   │   │       ├── acts@{actorId}@versions@{versionNumber}.yaml
    │   │   │       ├── acts@{actorId}@runs.yaml
    │   │   │       ├── acts@{actorId}@builds@{buildId}.yaml
    │   │   │       ├── acts.yaml
    │   │   │       ├── acts@{actorId}@run-sync.yaml
    │   │   │       ├── acts@{actorId}@builds.yaml
    │   │   │       ├── acts@{actorId}.yaml
    │   │   │       ├── acts@{actorId}@webhooks.yaml
    │   │   │       ├── acts@{actorId}@versions.yaml
    │   │   │       ├── acts@{actorId}@runs@{runId}@abort.yaml
    │   │   │       ├── acts@{actorId}@runs@{runId}.yaml
    │   │   │       ├── acts@{actorId}@runs@{runId}@resurrect.yaml
    │   │   │       ├── acts@{actorId}@builds@{buildId}@abort.yaml
    │   │   │       ├── acts@{actorId}@runs@{runId}@metamorph.yaml
    │   │   │       ├── acts@{actorId}@run-sync-get-dataset-items.yaml
    │   │   │       └── acts@{actorId}@runs@last.yaml
    │   │   ├── openapi.yaml
    │   │   ├── components/
    │   │   │   ├── tags.yaml
    │   │   │   ├── x-tag-groups.yaml
    │   │   │   ├── schemas/
    │   │   │   │   ├── actor-builds/
    │   │   │   │   │   ├── PostAbortBuildResponse.yaml
    │   │   │   │   │   ├── BuildsMeta.yaml
    │   │   │   │   │   ├── BuildUsage.yaml
    │   │   │   │   │   ├── GetBuildResponse.yaml
    │   │   │   │   │   ├── BuildShort.yaml
    │   │   │   │   │   ├── BuildStats.yaml
    │   │   │   │   │   ├── GetBuildListResponse.yaml
    │   │   │   │   │   ├── Build.yaml
    │   │   │   │   │   └── BuildOptions.yaml
    │   │   │   │   ├── webhooks/
    │   │   │   │   │   ├── ExampleWebhookDispatch.yaml
    │   │   │   │   │   ├── WebhookUpdate.yaml
    │   │   │   │   │   ├── UpdateWebhookResponse.yaml
    │   │   │   │   │   ├── GetListOfWebhooksResponse.yaml
    │   │   │   │   │   ├── WebhookCreate.yaml
    │   │   │   │   │   ├── CreateWebhookResponse.yaml
    │   │   │   │   │   ├── WebhookShort.yaml
    │   │   │   │   │   ├── WebhookCondition.yaml
    │   │   │   │   │   ├── GetWebhookResponse.yaml
    │   │   │   │   │   ├── WebhookStats.yaml
    │   │   │   │   │   ├── Webhook.yaml
    │   │   │   │   │   └── TestWebhookResponse.yaml
    │   │   │   │   ├── schedules/
    │   │   │   │   │   ├── ScheduleResponse.yaml
    │   │   │   │   │   ├── ScheduleCreate.yaml
    │   │   │   │   │   ├── ScheduleResponseDataActions.yaml
    │   │   │   │   │   ├── ScheduleInvoked.yaml
    │   │   │   │   │   ├── ScheduleCreateActions.yaml
    │   │   │   │   │   ├── GetScheduleLogResponse.yaml
    │   │   │   │   │   ├── ScheduleActionsRunOptions.yaml
    │   │   │   │   │   ├── GetListOfSchedulesResponse.yaml
    │   │   │   │   │   ├── ScheduleResponseData.yaml
    │   │   │   │   │   ├── GetListOfSchedulesResponseDataItemsActions.yaml
    │   │   │   │   │   ├── ScheduleActionsRunInput.yaml
    │   │   │   │   │   ├── GetListOfSchedulesResponseData.yaml
    │   │   │   │   │   └── GetListOfSchedulesResponseDataItems.yaml
    │   │   │   │   ├── store/
    │   │   │   │   │   ├── StoreData.yaml
    │   │   │   │   │   ├── StoreListActor.yaml
    │   │   │   │   │   ├── UpdateStoreRequest.yaml
    │   │   │   │   │   ├── CurrentPricingInfo.yaml
    │   │   │   │   │   └── GetListOfActorsInStoreResponse.yaml
    │   │   │   │   ├── actor-tasks/
    │   │   │   │   │   ├── TaskInput.yaml
    │   │   │   │   │   ├── TaskShort.yaml
    │   │   │   │   │   ├── CreateTaskRequest.yaml
    │   │   │   │   │   ├── TaskOptions.yaml
    │   │   │   │   │   ├── TaskStats.yaml
    │   │   │   │   │   ├── UpdateTaskRequest.yaml
    │   │   │   │   │   └── Task.yaml
    │   │   │   │   ├── request-queues/
    │   │   │   │   │   ├── GetRequestQueueResponse.yaml
    │   │   │   │   │   ├── UpdateRequestQueueRequest.yaml
    │   │   │   │   │   ├── GetRequestResponse.yaml
    │   │   │   │   │   ├── RequestQueueItems.yaml
    │   │   │   │   │   ├── RequestOperationInfo.yaml
    │   │   │   │   │   ├── ProlongRequestLockResponse.yaml
    │   │   │   │   │   ├── UpdateRequestResponse.yaml
    │   │   │   │   │   ├── GetHeadResponse.yaml
    │   │   │   │   │   ├── CreateRequestQueueResponse.yaml
    │   │   │   │   │   ├── BatchOperationResponse.yaml
    │   │   │   │   │   ├── UnprocessedRequest.yaml
    │   │   │   │   │   ├── RequestQueue.yaml
    │   │   │   │   │   ├── GetHeadAndLockResponse.yaml
    │   │   │   │   │   ├── UpdateRequestQueueResponse.yaml
    │   │   │   │   │   ├── ProcessedRequest.yaml
    │   │   │   │   │   ├── GetListOfRequestQueuesResponse.yaml
    │   │   │   │   │   ├── ListRequestsResponse.yaml
    │   │   │   │   │   ├── RequestQueueShort.yaml
    │   │   │   │   │   ├── AddRequestResponse.yaml
    │   │   │   │   │   ├── UserData.yaml
    │   │   │   │   │   └── RequestWithoutId.yaml
    │   │   │   │   ├── key-value-stores/
    │   │   │   │   │   ├── GetStoreResponse.yaml
    │   │   │   │   │   ├── KeyValueStoreStats.yaml
    │   │   │   │   │   ├── CreateKeyValueStoreResponse.yaml
    │   │   │   │   │   ├── KeyValueStore.yaml
    │   │   │   │   │   ├── ListOfKeysResponse.yaml
    │   │   │   │   │   ├── PutRecordRequest.yaml
    │   │   │   │   │   ├── GetListOfKeyValueStoresResponse.yaml
    │   │   │   │   │   ├── GetRecordResponse.yaml
    │   │   │   │   │   ├── GetListOfKeysResponse.yaml
    │   │   │   │   │   └── UpdateStoreResponse.yaml
    │   │   │   │   ├── users/
    │   │   │   │   │   ├── Limits.yaml
    │   │   │   │   │   ├── UserPublicInfo.yaml
    │   │   │   │   │   ├── UsageItem.yaml
    │   │   │   │   │   ├── PriceTiers.yaml
    │   │   │   │   │   ├── UsageCycle.yaml
    │   │   │   │   │   ├── Plan.yaml
    │   │   │   │   │   ├── AvailableProxyGroups.yaml
    │   │   │   │   │   ├── AccountLimits.yaml
    │   │   │   │   │   ├── ProxyGroup.yaml
    │   │   │   │   │   ├── MonthlyUsageCycle.yaml
    │   │   │   │   │   ├── Profile.yaml
    │   │   │   │   │   ├── Proxy.yaml
    │   │   │   │   │   ├── GetPublicUserDataResponse.yaml
    │   │   │   │   │   ├── UserPrivateInfo.yaml
    │   │   │   │   │   ├── GetPrivateUserDataResponse.yaml
    │   │   │   │   │   ├── GetMonthlyUsageResponse.yaml
    │   │   │   │   │   ├── UpdateLimitsRequest.yaml
    │   │   │   │   │   ├── GetLimitsResponse.yaml
    │   │   │   │   │   ├── DailyServiceUsages.yaml
    │   │   │   │   │   ├── ServiceUsage.yaml
    │   │   │   │   │   ├── Current.yaml
    │   │   │   │   │   ├── MonthlyServiceUsage.yaml
    │   │   │   │   │   └── MonthlyUsage.yaml
    │   │   │   │   ├── webhook-dispatches/
    │   │   │   │   │   ├── WebhookDispatch.yaml
    │   │   │   │   │   ├── WebhookDispatchList.yaml
    │   │   │   │   │   └── GetWebhookDispatchResponse.yaml
    │   │   │   │   ├── datasets/
    │   │   │   │   │   ├── PutItemsRequest.yaml
    │   │   │   │   │   ├── Dataset.yaml
    │   │   │   │   │   ├── GetListOfDatasetsResponse.yaml
    │   │   │   │   │   ├── DatasetSchemaValidationError.yaml
    │   │   │   │   │   ├── PutItemResponseError.yaml
    │   │   │   │   │   ├── DatasetResponse.yaml
    │   │   │   │   │   ├── DatasetListItem.yaml
    │   │   │   │   │   └── UpdateDatasetRequest.yaml
    │   │   │   │   ├── common/
    │   │   │   │   │   ├── ErrorResponse.yaml
    │   │   │   │   │   └── PaginationResponse.yaml
    │   │   │   │   ├── actor-runs/
    │   │   │   │   │   ├── RunMeta.yaml
    │   │   │   │   │   ├── RunShort.yaml
    │   │   │   │   │   ├── ChargeRunRequest.yaml
    │   │   │   │   │   ├── GetUserRunsListResponse.yaml
    │   │   │   │   │   ├── RunResponse.yaml
    │   │   │   │   │   ├── UpdateRunRequest.yaml
    │   │   │   │   │   ├── Run.yaml
    │   │   │   │   │   ├── RunStats.yaml
    │   │   │   │   │   ├── RunUsage.yaml
    │   │   │   │   │   └── RunOptions.yaml
    │   │   │   │   └── actors/
    │   │   │   │       ├── TaggedBuilds.yaml
    │   │   │   │       ├── GetActorResponse.yaml
    │   │   │   │       ├── GetVersionResponse.yaml
    │   │   │   │       ├── ActorStats.yaml
    │   │   │   │       ├── CreateActorResponse.yaml
    │   │   │   │       ├── GetEnvVarResponse.yaml
    │   │   │   │       ├── UpdateActorResponse.yaml
    │   │   │   │       ├── Actor.yaml
    │   │   │   │       ├── ExampleRunInput.yaml
    │   │   │   │       ├── CreateOrUpdateVersionRequest.yaml
    │   │   │   │       ├── Version.yaml
    │   │   │   │       ├── CreateOrUpdateEnvVarRequest.yaml
    │   │   │   │       ├── GetListOfActorsResponse.yaml
    │   │   │   │       ├── DefaultRunOptions.yaml
    │   │   │   │       ├── ActorShort.yaml
    │   │   │   │       ├── CreateActorRequest.yaml
    │   │   │   │       ├── EnvVar.yaml
    │   │   │   │       ├── GetVersionListResponse.yaml
    │   │   │   │       ├── VersionSourceType.yaml
    │   │   │   │       ├── ActorDefinition.yaml
    │   │   │   │       ├── VersionSourceFiles.yaml
    │   │   │   │       ├── UpdateActorRequest.yaml
    │   │   │   │       ├── GetEnvVarListResponse.yaml
    │   │   │   │       └── BuildActorResponse.yaml
    │   │   │   ├── securitySchemes/
    │   │   │   │   ├── httpBearerActorBuilds.yaml
    │   │   │   │   ├── apiKeyActorBuilds.yaml
    │   │   │   │   ├── apiKey.yaml
    │   │   │   │   ├── httpBearerQueueId.yaml
    │   │   │   │   ├── httpBearer.yaml
    │   │   │   │   ├── httpBearerStoreId.yaml
    │   │   │   │   ├── apiKeyStoreId.yaml
    │   │   │   │   └── apiKeyQueueId.yaml
    │   │   │   └── README.md
    │   │   ├── README.md
    │   │   └── code_samples/
    │   │       └── javascript/
    │   │           ├── acts_post.js
    │   │           ├── schedule_log_get.js
    │   │           ├── actorBuilds_get.js
    │   │           ├── schedule_delete.js
    │   │           ├── act_builds_get.js
    │   │           ├── act_webhooks_get.js
    │   │           ├── webhooks_get.js
    │   │           ├── actorTask_delete.js
    │   │           ├── actorTasks_get.js
    │   │           ├── actorRuns_get.js
    │   │           ├── actorBuild_log_get.js
    │   │           ├── keyValueStore_get.js
    │   │           ├── datasets_get.js
    │   │           ├── actorTasks_post.js
    │   │           ├── requestQueue_request_put.js
    │   │           ├── requestQueue_requests_batch_delete.js
    │   │           ├── requestQueue_get.js
    │   │           ├── actorRun_put.js
    │   │           ├── schedule_put.js
    │   │           ├── keyValueStore_record_get.js
    │   │           ├── keyValueStore_record_delete.js
    │   │           ├── dataset_delete.js
    │   │           ├── actorBuild_get.js
    │   │           ├── act_version_envVar_get.js
    │   │           ├── actorTask_input_get.js
    │   │           ├── act_versions_get.js
    │   │           ├── webhook_test_post.js
    │   │           ├── act_version_envVar_delete.js
    │   │           ├── actorTask_put.js
    │   │           ├── dataset_put.js
    │   │           ├── act_version_delete.js
    │   │           ├── act_version_put.js
    │   │           ├── log_get.js
    │   │           ├── act_version_envVars_get.js
    │   │           ├── users_me_usage_monthly_get.js
    │   │           ├── keyValueStore_delete.js
    │   │           ├── actorRun_metamorph_post.js
    │   │           ├── actorBuild_delete.js
    │   │           ├── actorBuild_abort_post.js
    │   │           ├── actorTask_input_put.js
    │   │           ├── webhook_dispatches_get.js
    │   │           ├── datasets_post.js
    │   │           ├── act_delete.js
    │   │           ├── webhooks_post.js
    │   │           ├── requestQueue_request_lock_put.js
    │   │           ├── webhook_put.js
    │   │           ├── requestQueue_delete.js
    │   │           ├── actorTask_get.js
    │   │           ├── dataset_items_post.js
    │   │           ├── requestQueues_post.js
    │   │           ├── actorRun_abort_post.js
    │   │           ├── user_get.js
    │   │           ├── act_runs_last_get.js
    │   │           ├── act_runs_post.js
    │   │           ├── act_version_envVar_put.js
    │   │           ├── schedule_get.js
    │   │           ├── requestQueue_requests_post.js
    │   │           ├── act_version_get.js
    │   │           ├── act_put.js
    │   │           ├── requestQueues_get.js
    │   │           ├── dataset_get.js
    │   │           ├── schedules_get.js
    │   │           ├── act_versions_post.js
    │   │           ├── act_get.js
    │   │           ├── actorRun_reboot_post.js
    │   │           ├── actorRun_delete.js
    │   │           ├── requestQueue_head_get.js
    │   │           ├── requestQueue_put.js
    │   │           ├── keyValueStores_post.js
    │   │           ├── webhook_delete.js
    │   │           ├── schedules_post.js
    │   │           ├── users_me_limits_get.js
    │   │           ├── act_version_envVars_post.js
    │   │           ├── keyValueStore_record_put.js
    │   │           ├── users_me_limits_put.js
    │   │           ├── webhookDispatches_get.js
    │   │           ├── requestQueue_head_lock_post.js
    │   │           ├── actorRun_resurrect_post.js
    │   │           ├── dataset_items_get.js
    │   │           ├── requestQueue_requests_batch_post.js
    │   │           ├── keyValueStore_put.js
    │   │           ├── actorRun_get.js
    │   │           ├── actorTask_webhooks_get.js
    │   │           ├── users_me_get.js
    │   │           ├── requestQueue_request_get.js
    │   │           ├── requestQueue_requests_get.js
    │   │           ├── webhookDispatch_get.js
    │   │           ├── actorTask_runs_get.js
    │   │           ├── keyValueStores_get.js
    │   │           ├── acts_get.js
    │   │           ├── act_runs_get.js
    │   │           ├── act_builds_post.js
    │   │           ├── requestQueue_request_lock_delete.js
    │   │           ├── store_get.js
    │   │           ├── actorTask_runs_post.js
    │   │           ├── webhook_get.js
    │   │           ├── requestQueue_request_delete.js
    │   │           └── keyValueStore_keys_get.js
    │   └── README.md
    ├── examples/
    │   ├── python-data-scraper/
    │   │   ├── main.py
    │   │   └── requirements.txt
    │   ├── python-data-parser/
    │   │   ├── main.py
    │   │   └── requirements.txt
    │   └── ts-parallel-scraping/
    │       ├── orchestrator/
    │       │   ├── package.json
    │       │   ├── tsconfig.json
    │       │   ├── .actor/
    │       │   │   ├── input_schema.json
    │       │   │   ├── Dockerfile
    │       │   │   └── actor.json
    │       │   └── src/
    │       │       └── main.ts
    │       └── scraper/
    │           ├── package.json
    │           ├── tsconfig.json
    │           ├── .actor/
    │           │   ├── input_schema.json
    │           │   ├── Dockerfile
    │           │   └── actor.json
    │           └── src/
    │               └── main.ts
    ├── babel.config.js
    ├── patches/
    │   └── docusaurus-theme-openapi-docs+0.0.0-961.patch
    ├── LICENSE
    ├── tsconfig.json
    ├── README.md
    ├── sources/
    │   ├── api/
    │   │   └── sidebars.js
    │   ├── legal/
    │   │   ├── sidebars.js
    │   │   ├── index.mdx
    │   │   ├── old/
    │   │   │   ├── store-publishing-terms-and-conditions-2022.md
    │   │   │   └── general-terms-and-conditions-2022.md
    │   │   └── latest/
    │   │       ├── terms/
    │   │       │   ├── general-terms-and-conditions.md
    │   │       │   ├── data-processing-addendum.md
    │   │       │   ├── store-publishing-terms-and-conditions.md
    │   │       │   └── affiliate-program-terms-and-conditions.md
    │   │       └── policies/
    │   │           ├── gdpr-information.md
    │   │           ├── privacy-policy.md
    │   │           ├── cookie-policy.md
    │   │           └── acceptable-use-policy.md
    │   ├── academy/
    │   │   ├── sidebars.js
    │   │   ├── index.mdx
    │   │   ├── images/
    │   │   ├── platform/
    │   │   │   ├── get_most_of_actors/
    │   │   │   │   ├── images/
    │   │   │   │   │   ├── how-to-scrape-target-site.webp
    │   │   │   │   │   └── actor-monetization-request.webp
    │   │   │   │   ├── index.md
    │   │   │   │   └── monetizing_your_actor.md
    │   │   │   ├── getting_started/
    │   │   │   │   ├── inputs_outputs.md
    │   │   │   │   ├── apify_api.md
    │   │   │   │   ├── images/
    │   │   │   │   ├── index.md
    │   │   │   │   ├── creating_actors.md
    │   │   │   │   ├── apify_client.md
    │   │   │   │   └── actors.md
    │   │   │   ├── running_a_web_server.md
    │   │   │   ├── apify_platform.md
    │   │   │   ├── expert_scraping_with_apify/
    │   │   │   │   ├── apify_api_and_client.md
    │   │   │   │   ├── tasks_and_storage.md
    │   │   │   │   ├── saving_useful_stats.md
    │   │   │   │   ├── solutions/
    │   │   │   │   │   ├── saving_stats.md
    │   │   │   │   │   ├── using_storage_creating_tasks.md
    │   │   │   │   │   ├── images/
    │   │   │   │   │   ├── rotating_proxies.md
    │   │   │   │   │   ├── index.md
    │   │   │   │   │   ├── using_api_and_client.md
    │   │   │   │   │   ├── handling_migrations.md
    │   │   │   │   │   ├── integrating_webhooks.md
    │   │   │   │   │   └── managing_source.md
    │   │   │   │   ├── actors_webhooks.md
    │   │   │   │   ├── images/
    │   │   │   │   ├── index.md
    │   │   │   │   ├── bypassing_anti_scraping.md
    │   │   │   │   ├── managing_source_code.md
    │   │   │   │   └── migrations_maintaining_state.md
    │   │   │   └── deploying_your_code/
    │   │   │       ├── deploying.md
    │   │   │       ├── inputs_outputs.md
    │   │   │       ├── images/
    │   │   │       │   ├── actor-json-example.webp
    │   │   │       │   └── output-schema-final-example.webp
    │   │   │       ├── index.md
    │   │   │       ├── output_schema.md
    │   │   │       ├── input_schema.md
    │   │   │       └── docker_file.md
    │   │   ├── tutorials/
    │   │   │   ├── api/
    │   │   │   │   ├── retry_failed_requests.md
    │   │   │   │   ├── images/
    │   │   │   │   ├── index.md
    │   │   │   │   └── run_actor_and_retrieve_data_via_api.md
    │   │   │   ├── apify_scrapers/
    │   │   │   │   ├── getting_started.md
    │   │   │   │   ├── puppeteer_scraper.md
    │   │   │   │   ├── web_scraper.md
    │   │   │   │   ├── cheerio_scraper.md
    │   │   │   │   ├── images/
    │   │   │   │   └── index.md
    │   │   │   ├── php/
    │   │   │   │   ├── index.md
    │   │   │   │   └── using_apify_from_php.md
    │   │   │   ├── python/
    │   │   │   │   ├── scrape_data_python.md
    │   │   │   │   ├── images/
    │   │   │   │   ├── index.md
    │   │   │   │   └── process_data_using_python.md
    │   │   │   ├── tutorials/
    │   │   │   │   └── index.md
    │   │   │   └── node_js/
    │   │   │       ├── debugging_web_scraper.md
    │   │   │       ├── scraping_urls_list_from_google_sheets.md
    │   │   │       ├── filter_blocked_requests_using_sessions.md
    │   │   │       ├── analyzing_pages_and_fixing_errors.md
    │   │   │       ├── caching_responses_in_puppeteer.js
    │   │   │       ├── block_requests_puppeteer.md
    │   │   │       ├── caching_responses_in_puppeteer.md
    │   │   │       ├── submitting_form_with_file_attachment.md
    │   │   │       ├── submitting_forms_on_aspx_pages.md
    │   │   │       ├── avoid_eacces_error_in_actor_builds.md
    │   │   │       ├── dealing_with_dynamic_pages.md
    │   │   │       ├── js_in_html.md
    │   │   │       ├── scraping_from_sitemaps.md
    │   │   │       ├── optimizing_scrapers.md
    │   │   │       ├── images/
    │   │   │       ├── dealing_with_dynamic_pages.js
    │   │   │       ├── how_to_save_screenshots_puppeteer.md
    │   │   │       ├── index.md
    │   │   │       ├── multiple-runs-scrape.md
    │   │   │       ├── processing_multiple_pages_web_scraper.md
    │   │   │       ├── how_to_fix_target_closed.md
    │   │   │       ├── using_proxy_to_intercept_requests_puppeteer.md
    │   │   │       ├── add_external_libraries_web_scraper.md
    │   │   │       ├── scraping_from_sitemaps.js
    │   │   │       ├── handle_blocked_requests_puppeteer.md
    │   │   │       ├── choosing_the_right_scraper.md
    │   │   │       ├── waiting_for_dynamic_content.md
    │   │   │       ├── when_to_use_puppeteer_scraper.md
    │   │   │       ├── apify_free_google_serp_api.md
    │   │   │       ├── request_labels_in_apify_actors.md
    │   │   │       └── scraping_shadow_doms.md
    │   │   ├── homepage_content.json
    │   │   ├── glossary/
    │   │   │   ├── tools/
    │   │   │   │   ├── images/
    │   │   │   │   ├── quick_javascript_switcher.md
    │   │   │   │   ├── proxyman.md
    │   │   │   │   ├── index.md
    │   │   │   │   ├── insomnia.md
    │   │   │   │   ├── modheader.md
    │   │   │   │   ├── edit_this_cookie.md
    │   │   │   │   ├── postman.md
    │   │   │   │   ├── apify_cli.md
    │   │   │   │   ├── user_agent_switcher.md
    │   │   │   │   └── switchyomega.md
    │   │   │   ├── concepts/
    │   │   │   │   ├── http_headers.md
    │   │   │   │   ├── css_selectors.md
    │   │   │   │   ├── robot_process_automation.md
    │   │   │   │   ├── index.md
    │   │   │   │   ├── http_cookies.md
    │   │   │   │   ├── dynamic_pages.md
    │   │   │   │   ├── html_elements.md
    │   │   │   │   └── querying_css_selectors.md
    │   │   │   └── glossary.md
    │   │   └── webscraping/
    │   │       ├── typescript/
    │   │       │   ├── enums.md
    │   │       │   ├── mini_project.md
    │   │       │   ├── unknown_and_type_assertions.md
    │   │       │   ├── type_aliases.md
    │   │       │   ├── interfaces.md
    │   │       │   ├── using_types.md
    │   │       │   ├── images/
    │   │       │   │   └── typescript-logo.webp
    │   │       │   ├── using_types_continued.md
    │   │       │   ├── index.md
    │   │       │   ├── installation.md
    │   │       │   └── watch_mode_and_tsconfig.md
    │   │       ├── anti_scraping/
    │   │       │   ├── mitigation/
    │   │       │   │   ├── proxies.md
    │   │       │   │   ├── generating_fingerprints.md
    │   │       │   │   ├── images/
    │   │       │   │   ├── index.md
    │   │       │   │   ├── cloudflare_challenge.md
    │   │       │   │   └── using_proxies.md
    │   │       │   ├── index.md
    │   │       │   └── techniques/
    │   │       │       ├── rate_limiting.md
    │   │       │       ├── browser_challenges.md
    │   │       │       ├── fingerprinting.md
    │   │       │       ├── geolocation.md
    │   │       │       ├── images/
    │   │       │       ├── index.md
    │   │       │       ├── firewalls.md
    │   │       │       └── captchas.md
    │   │       ├── puppeteer_playwright/
    │   │       │   ├── executing_scripts/
    │   │       │   │   ├── images/
    │   │       │   │   ├── index.md
    │   │       │   │   ├── extracting_data.md
    │   │       │   │   └── injecting_code.md
    │   │       │   ├── proxies.md
    │   │       │   ├── browser_contexts.md
    │   │       │   ├── page/
    │   │       │   │   ├── waiting.md
    │   │       │   │   ├── interacting_with_a_page.md
    │   │       │   │   ├── images/
    │   │       │   │   ├── page_methods.md
    │   │       │   │   └── index.md
    │   │       │   ├── browser.md
    │   │       │   ├── images/
    │   │       │   ├── common_use_cases/
    │   │       │   │   ├── logging_into_a_website.md
    │   │       │   │   ├── submitting_a_form_with_a_file_attachment.md
    │   │       │   │   ├── images/
    │   │       │   │   ├── scraping_iframes.md
    │   │       │   │   ├── index.md
    │   │       │   │   ├── downloading_files.md
    │   │       │   │   └── paginating_through_results.md
    │   │       │   ├── index.md
    │   │       │   └── reading_intercepting_requests.md
    │   │       ├── advanced_web_scraping/
    │   │       │   ├── scraping_paginated_sites.md
    │   │       │   ├── tips_and_tricks_robustness.md
    │   │       │   ├── images/
    │   │       │   └── index.md
    │   │       ├── scraping_basics_python/
    │   │       │   ├── 06_locating_elements.md
    │   │       │   ├── 01_devtools_inspecting.md
    │   │       │   ├── 08_saving_data.md
    │   │       │   ├── 03_devtools_extracting_data.md
    │   │       │   ├── 10_crawling.md
    │   │       │   ├── 13_platform.md
    │   │       │   ├── images/
    │   │       │   ├── 07_extracting_data.md
    │   │       │   ├── 12_framework.md
    │   │       │   ├── _exercises.mdx
    │   │       │   ├── 04_downloading_html.md
    │   │       │   ├── 02_devtools_locating_elements.md
    │   │       │   ├── index.md
    │   │       │   ├── 11_scraping_variants.md
    │   │       │   ├── 09_getting_links.md
    │   │       │   └── 05_parsing_html.md
    │   │       ├── api_scraping/
    │   │       │   ├── graphql_scraping/
    │   │       │   │   ├── modifying_variables.md
    │   │       │   │   ├── custom_queries.md
    │   │       │   │   ├── images/
    │   │       │   │   ├── index.md
    │   │       │   │   └── introspection.md
    │   │       │   ├── images/
    │   │       │   ├── general_api_scraping/
    │   │       │   │   ├── images/
    │   │       │   │   ├── cookies_headers_tokens.md
    │   │       │   │   ├── index.md
    │   │       │   │   ├── handling_pagination.md
    │   │       │   │   └── locating_and_learning.md
    │   │       │   └── index.md
    │   │       └── scraping_basics_javascript/
    │   │           ├── introduction.md
    │   │           ├── images/
    │   │           ├── index.md
    │   │           ├── best_practices.md
    │   │           ├── challenge/
    │   │           │   ├── images/
    │   │           │   ├── index.md
    │   │           │   ├── initializing_and_setting_up.md
    │   │           │   ├── scraping_amazon.md
    │   │           │   └── modularity.md
    │   │           ├── data_extraction/
    │   │           │   ├── using_devtools.md
    │   │           │   ├── browser_devtools.md
    │   │           │   ├── save_to_csv.md
    │   │           │   ├── images/
    │   │           │   ├── project_setup.md
    │   │           │   ├── index.md
    │   │           │   ├── computer_preparation.md
    │   │           │   ├── devtools_continued.md
    │   │           │   ├── node_continued.md
    │   │           │   └── node_js_scraper.md
    │   │           └── crawling/
    │   │               ├── pro_scraping.md
    │   │               ├── headless_browser.md
    │   │               ├── finding_links.js
    │   │               ├── recap_extraction_basics.md
    │   │               ├── first_crawl.md
    │   │               ├── scraping_the_data.md
    │   │               ├── finding_links.md
    │   │               ├── exporting_data.md
    │   │               ├── images/
    │   │               ├── index.md
    │   │               ├── relative_urls.md
    │   │               └── filtering_links.md
    │   └── platform/
    │       ├── limits.md
    │       ├── console/
    │       │   ├── two-factor-authentication.md
    │       │   ├── settings.md
    │       │   ├── store.md
    │       │   ├── images/
    │       │   ├── index.md
    │       │   └── billing.md
    │       ├── security.md
    │       ├── schedules.md
    │       ├── sidebars.js
    │       ├── api_v2/
    │       │   └── api_v2_reference.apib
    │       ├── index.mdx
    │       ├── collaboration/
    │       │   ├── access_rights.md
    │       │   ├── list_of_permissions.md
    │       │   ├── organization_account/
    │       │   │   ├── setup.md
    │       │   │   ├── how_to_use.md
    │       │   │   └── index.md
    │       │   ├── images/
    │       │   │   ├── organizations/
    │       │   │   └── access-rights/
    │       │   └── index.md
    │       ├── images/
    │       │   ├── limits/
    │       │   └── security/
    │       ├── homepage_content.json
    │       ├── monitoring/
    │       │   ├── images/
    │       │   └── index.md
    │       ├── proxy/
    │       │   ├── images/
    │       │   ├── datacenter_proxy.md
    │       │   ├── google_serp_proxy.md
    │       │   ├── residential_proxy.md
    │       │   ├── index.md
    │       │   ├── usage.md
    │       │   └── your_own_proxies.md
    │       ├── integrations/
    │       │   ├── index.mdx
    │       │   ├── ai/
    │       │   │   ├── aws_bedrock.md
    │       │   │   ├── qdrant.md
    │       │   │   ├── milvus.md
    │       │   │   ├── llama.md
    │       │   │   ├── openai_assistants.md
    │       │   │   ├── flowise.md
    │       │   │   ├── _category_.yml
    │       │   │   ├── pinecone.md
    │       │   │   ├── langchain.md
    │       │   │   └── haystack.md
    │       │   ├── integrate_with_apify.md
    │       │   ├── workflows-and-notifications/
    │       │   │   ├── gmail.md
    │       │   │   ├── telegram.md
    │       │   │   ├── slack.md
    │       │   │   ├── make.md
    │       │   │   ├── zapier.md
    │       │   │   └── _category_.yml
    │       │   ├── data-storage/
    │       │   │   ├── drive.md
    │       │   │   ├── airbyte.md
    │       │   │   ├── keboola.md
    │       │   │   └── _category_.yml
    │       │   ├── images/
    │       │   │   ├── gdrive/
    │       │   │   ├── keboola/
    │       │   │   └── gmail/
    │       │   ├── programming/
    │       │   │   ├── api.md
    │       │   │   ├── webhooks/
    │       │   │   │   ├── index.md
    │       │   │   │   ├── ad_hoc_webhooks.md
    │       │   │   │   ├── events.md
    │       │   │   │   └── actions.md
    │       │   │   ├── _category_.yml
    │       │   │   └── github.md
    │       │   └── actors/
    │       │       ├── images/
    │       │       ├── integration_ready_actors.md
    │       │       ├── index.md
    │       │       ├── integrating_actors_via_api.md
    │       │       └── _category_.yml
    │       ├── storage/
    │       │   ├── request_queue.md
    │       │   ├── dataset.md
    │       │   ├── images/
    │       │   ├── index.md
    │       │   ├── usage.md
    │       │   └── key_value_store.md
    │       └── actors/
    │           ├── index.mdx
    │           ├── images/
    │           ├── publishing/
    │           │   ├── publish.mdx
    │           │   ├── index.mdx
    │           │   ├── images/
    │           │   │   ├── actor-title-description.webp
    │           │   │   ├── actor-test.webp
    │           │   │   ├── publish-actor-to-store.webp
    │           │   │   ├── actor-badge/
    │           │   │   ├── actor-page.webp
    │           │   │   ├── actor-publication-settings.webp
    │           │   │   ├── actor-display-information.webp
    │           │   │   ├── Apify-Store.webp
    │           │   │   └── actor-SEO.webp
    │           │   ├── monetize.mdx
    │           │   ├── testing.mdx
    │           │   └── badge.mdx
    │           ├── running/
    │           │   ├── actor_standby.md
    │           │   ├── store.md
    │           │   ├── images/
    │           │   │   ├── runs_and_builds/
    │           │   │   ├── actor_standby/
    │           │   │   ├── usage_and_resources/
    │           │   │   ├── store/
    │           │   │   ├── tasks/
    │           │   │   └── input_and_output/
    │           │   ├── runs_and_builds.md
    │           │   ├── index.md
    │           │   ├── input_and_output.md
    │           │   ├── usage_and_resources.md
    │           │   └── tasks.md
    │           └── development/
    │               ├── deployment/
    │               │   ├── images/
    │               │   ├── source_types.md
    │               │   ├── index.md
    │               │   └── continuous_integration.md
    │               ├── actor_definition/
    │               │   ├── docker.md
    │               │   ├── images/
    │               │   ├── input_schema/
    │               │   │   ├── secret_input.md
    │               │   │   ├── images/
    │               │   │   ├── specification.md
    │               │   │   └── index.md
    │               │   ├── index.md
    │               │   ├── source_code.md
    │               │   ├── dataset_schema/
    │               │   │   ├── validation.md
    │               │   │   └── index.md
    │               │   └── actor_json.md
    │               ├── performance.md
    │               ├── programming_interface/
    │               │   ├── status_messages.md
    │               │   ├── system_events.md
    │               │   ├── index.mdx
    │               │   ├── actor_standby.md
    │               │   ├── images/
    │               │   ├── container_web_server.md
    │               │   ├── environment_variables.md
    │               │   ├── basic_commands.md
    │               │   └── metamorph.md
    │               ├── builds_and_runs/
    │               │   ├── runs.md
    │               │   ├── index.md
    │               │   ├── state_persistence.md
    │               │   └── builds.md
    │               ├── automated_tests.md
    │               ├── index.md
    │               └── quick_start/
    │                   ├── index.mdx
    │                   ├── images/
    │                   ├── start_locally.md
    │                   └── start_web_ide.md
    ├── CONTRIBUTING.md
    ├── .lycheeignore
    ├── docusaurus.config.js
    ├── src/
    │   ├── components/
    │   │   ├── ChangeLog/
    │   │   │   ├── ChangeLog.tsx
    │   │   │   └── styles.module.css
    │   │   ├── PlatformCard.jsx
    │   │   ├── CardGrid.jsx
    │   │   ├── CardWithIcon/
    │   │   │   ├── CardWithIcon.tsx
    │   │   │   └── styles.module.css
    │   │   ├── Text.tsx
    │   │   ├── Tabs.tsx
    │   │   ├── ApiLink.jsx
    │   │   ├── Section/
    │   │   │   ├── Section.tsx
    │   │   │   └── styles.module.css
    │   │   ├── CardWithImageAndContent/
    │   │   │   ├── ImageWithContent.tsx
    │   │   │   └── styles.module.css
    │   │   ├── SdkSection/
    │   │   │   └── SdkSection.tsx
    │   │   ├── Heading.tsx
    │   │   ├── ActorTemplates/
    │   │   │   └── ActorTemplates.tsx
    │   │   ├── PlainCard/
    │   │   │   ├── PlainCard.tsx
    │   │   │   └── styles.module.css
    │   │   ├── Cards.module.css
    │   │   ├── Button.tsx
    │   │   ├── Card.jsx
    │   │   ├── ActionCard/
    │   │   │   ├── ActionCard.tsx
    │   │   │   └── styles.module.css
    │   │   ├── Hero/
    │   │   │   ├── Hero.tsx
    │   │   │   └── styles.module.css
    │   │   ├── UiLibraryWrapper.tsx
    │   │   ├── CardGrid.module.css
    │   │   ├── GitButton.tsx
    │   │   └── OpenSourceCards/
    │   │       ├── styles.module.css
    │   │       └── OpenSourceCards.tsx
    │   ├── pages/
    │   │   ├── api/
    │   │   │   ├── v2-old.js
    │   │   │   ├── styles.module.css
    │   │   │   └── index.tsx
    │   │   ├── index.module.css
    │   │   ├── open-source/
    │   │   │   └── index.tsx
    │   │   ├── sdk/
    │   │   │   └── index.tsx
    │   │   ├── versions.js
    │   │   ├── img/
    │   │   │   ├── academy_icons/
    │   │   │   └── platform_icons/
    │   │   └── index.tsx
    │   └── theme/
    │       ├── DocItem/
    │       │   ├── Metadata/
    │       │   │   └── index.js
    │       │   └── Layout/
    │       │       ├── index.js
    │       │       └── styles.module.css
    │       ├── DocCard/
    │       │   ├── index.js
    │       │   └── styles.module.css
    │       └── DocBreadcrumbs/
    │           └── Items/
    │               └── Home/
    │                   └── styles.module.css
    ├── .editorconfig
    ├── .redocly.yaml
    └── static/
        ├── .nojekyll
        ├── img/
        │   ├── academy/
        │   ├── platform/
        │   │   └── integrations/
        │   ├── features/
        │   ├── landing-pages/
        │   └── getting-started/
        ├── robots.txt
        └── sitemap.xml


Files Content:

(Files content cropped to 300k characters, download full ingest to see more)
================================================
File: /README.md
================================================
# Apify Documentation

[![Check & Release](https://github.com/apify/apify-docs/actions/workflows/test.yaml/badge.svg)](https://github.com/apify/apify-docs/actions/workflows/test.yaml)

## Intro

This repository is the home of Apify's documentation, which you can find at [docs.apify.com](https://docs.apify.com/). The documentation is written using [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). Source files of the [platform documentation](https://docs.apify.com/platform) are located in the [/sources](https://github.com/apify/apify-docs/tree/master/sources) directory. However, other sections, such as SDKs for [JavaScript/Node.js](https://docs.apify.com/sdk/js/), [Python](https://docs.apify.com/sdk/python/), or [CLI](https://docs.apify.com/cli/), have their own repositories. For more information, see the [Contributing guidelines](./CONTRIBUTING.md).

## Before you start contributing

> [!IMPORTANT]
> Before you contribute to Apify documentation with your first pull request, please read the following 2 articles:
>
> - [Contributing guidelines](CONTRIBUTING.md), where you learn about the project structure, local development, testing, and setting up redirects.
> - [Style guide](#style-guide), here below 👇, where you learn how to keep the documentation style consistent.

## Style guide

In addition to the following tips, check existing docs for formatting and style tips when in doubt.

### Language

Adhere to US-EN language standards to maintain consistency and clarity in our documentation.

Use inclusive language, for example:

Instead of _see_, use _view_ or _check out_.

Avoid using directional language like:

> Click the **Home** button on the left to return to the homepage.
> You'll find the account settings on the left-hand side menu.

Instead, try to be more descriptive, for example:

> Click the **Home** button in the menu, to return to the homepage.
> You'll find the account settings under the **Settings** button in the menu.

### Highlighting

- For consistency, use **bold** to highlight UI text when dealing with UI-focused documentation (for example, Apify Console).
- For consistency, use _italics_ to emphasize text.
- For inline `code` examples, use **back-ticks** (\` \`).
- For multi-line code examples, use code fences and specify the language. Preferably, specify the title as well. Within platform documentation, always use [Code tabs](README.md#code-tabs) and declare the language.

  ``````markdown
  ```js showLineNumbers title='foo.js'

  const docsAreCool = require('coolDocs'); <br/>
  ...<br/>
  return docsAreCool;<br/>

  ```
  ``````

Check out [Markdown features](https://docusaurus.io/docs/markdown-features) in the Docusaurus docs for more information.

### Admonitions

In Apify platform documentation, always use admonitions to emphasize crucial information, warnings, tips, or additional context. The available admonitions include:

- `note`
- `tip`
- `info`
- `caution`
- `danger`

Consult the [Docusaurus documentation](https://docusaurus.io/docs/2.x/markdown-features/admonitions) for visual distinctions between each type and guidelines on usage. Choose the most relevant type for your content. Maintain proper formatting by adding blank lines following the admonition blocks. Title your admonition next to its type, as shown below:

```markdown
:::note Your Title Here

Your important message here.

:::
```

### Code tabs

View [Docusaurus documentation for tabs](https://docusaurus.io/docs/markdown-features/tabs) for examples. In Apify platform documentation, always use the code tabs to include examples for both JavaScript and Python languages.

```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    This is an apple 🍎
  </TabItem>
  <TabItem value="orange" label="Orange">
    This is an orange 🍊
  </TabItem>
  <TabItem value="banana" label="Banana">
    This is a banana 🍌
  </TabItem>
</Tabs>
```

### Metadata

You must provide the new page metadata as part of the so-called [front matter](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter).

```markdown
---
id: doc-markdown
title: Docs Markdown Features
hide_title: false
hide_table_of_contents: false
sidebar_label: Markdown
sidebar_position: 3
pagination_label: Markdown features
custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: How do I find you when I cannot solve this problem
keywords:
  - docs
  - docusaurus
image: https://i.imgur.com/mErPwqL.png
slug: /myDoc
last_update:
  date: 1/1/2000
  author: custom author name
---

# Markdown Features

My Document Markdown content
```

### Descriptions

- Metadata descriptions are super important in making our documentation easy to find using search engines. To maximize our SEO, _keep the descriptions between [140 and 160 characters](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwigg6Og56brAhUNi1wKHULsAHEQFjAGegQIDBAG&url=https%3A%2F%2Fmoz.com%2Flearn%2Fseo%2Fmeta-description&usg=AOvVaw3L26bXhHZTd0wYDM_5xtJ9) whenever possible_.

    Of course, when there just isn't enough to say, don't waffle - it's not a university essay.

    GOOD:

    > "Store anything from images and key-value pairs to structured output data. Learn how to access and manage your stored data from the Apify platform or via API."

    AVOID:

    > "Apify storage docs."

- Avoid using the word "_documentation_".

    GOOD:

    > "Learn how to develop, run and share serverless cloud programs. Create your own web scraping and automation tools and publish them on the Apify platform."

    AVOID:

    > "Documentation of Apify Actors - the easy way to build serverless cloud programs."

- Avoid _keyword stuffing_, i.e., repeating the article's name too much; view the [Wikipedia article](https://en.wikipedia.org/wiki/Keyword_stuffing) for more.

    GOOD:

    > Title: Proxy
    >
    > Description: Learn how to anonymously access websites when running web scraping or automation jobs. Prevent IP address-based blocking using IP address rotation.

    AVOID:

    > Title: Proxy
    >
    > Description: Learn how to use Apify Proxy. Prevent IP address-based blocking using a proxy. Apify Proxy helps you bypass security.

- Phrase the descriptions in a way that answers a question that the person using the search engine might have.

    GOOD:

    > Learn how to make your Actor available to the public or keep it private. Prepare your Actor for Apify Store with a description and README file.

    AVOID:

    > Description of the processes regarding optimizing and preparing for publishing of one's Actor in Apify Store.

### Screenshots

Documentation has both light and dark themes. However, to keep the screenshots consistent and easily manageable, use the light theme for all screenshots.

All screenshots should have a meaningful alt text to accommodate screen readers.

If you add arrows or other indicators to the screenshots, they should be red for high contrast and visibility on the light theme.


================================================
File: /apify-docs-theme/package.json
================================================
{
    "name": "@apify/docs-theme",
    "version": "1.0.148",
    "description": "",
    "main": "./src/index.js",
    "files": [
        "src",
        "types",
        "static"
    ],
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "echo 'Building @apify/docs-theme!'"
    },
    "keywords": [],
    "author": "Apify Technologies s.r.o.",
    "license": "ISC",
    "publishConfig": {
        "access": "public"
    },
    "dependencies": {
        "@apify/docs-search-modal": "^1.1.1",
        "@docusaurus/theme-common": "3.6.3",
        "@stackql/docusaurus-plugin-hubspot": "^1.1.0",
        "axios": "^1.7.4",
        "babel-loader": "^9.1.3",
        "docusaurus-gtm-plugin": "^0.0.2",
        "postcss-preset-env": "^9.3.0",
        "prism-react-renderer": "^2.0.6",
        "remark-parse": "^11.0.0",
        "remark-stringify": "^11.0.0",
        "unified": "^11.0.5",
        "unist-util-visit-parents": "^3.1.1"
    },
    "peerDependencies": {
        "clsx": "*",
        "react": "*",
        "react-dom": "*"
    }
}


================================================
File: /apify-docs-theme/src/roa-loader/package.json
================================================
{
  "name": "roa-loader",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "loader-utils": "^3.2.1"
  }
}


================================================
File: /apify-docs-theme/src/roa-loader/index.js
================================================
const { createHash } = require('node:crypto');
const { inspect } = require('node:util');

const { urlToRequest } = require('loader-utils');

const signingUrl = new URL('https://api.apify.com/v2/tools/encode-and-sign');
signingUrl.searchParams.set('token', process.env.APIFY_SIGNING_TOKEN);
const queue = [];
const cache = {};
let working = false;

function hash(source) {
    return createHash('sha1').update(source).digest('hex');
}

async function getHash(source) {
    const cacheKey = hash(source);

    if (cache[cacheKey]) {
        return cache[cacheKey];
    }

    const memory = source.match(/playwright|puppeteer/i) ? 4096 : 1024;
    const res = await (await fetch(signingUrl, {
        method: 'POST',
        body: JSON.stringify({
            input: JSON.stringify({ code: source }),
            options: {
                build: 'latest',
                contentType: 'application/json; charset=utf-8',
                memory,
                timeout: 180,
            },
        }),
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    })).json();

    if (!res.data || !res.data.encoded) {
        // eslint-disable-next-line no-console
        console.error(`Signing failed:' ${inspect(res.error) || 'Unknown error'}`, res);
        return 'invalid-token';
    }

    cache[cacheKey] = res.data.encoded;
    await new Promise((resolve) => setTimeout(resolve, 100));

    return res.data.encoded;
}

async function encodeAndSign(source) {
    if (working) {
        return new Promise((resolve, reject) => {
            queue.push(() => {
                return getHash(source).then(resolve, reject);
            });
        });
    }

    let res;

    try {
        working = true;
        res = await getHash(source);

        while (queue.length) {
            await queue.shift()();
        }
    } finally {
        working = false;
    }

    return res;
}

module.exports = async function (code) {
    if (process.env.CRAWLEE_DOCS_FAST) {
        return { code, hash: 'fast' };
    }

    // eslint-disable-next-line no-console
    console.log(`Signing ${urlToRequest(this.resourcePath)}...`, { working, queue: queue.length });
    const codeHash = await encodeAndSign(code);

    return { code, hash: codeHash };
};


================================================
File: /apify-docs-theme/src/markdown.js
================================================
const remarkParse = require('remark-parse');
const remarkStringify = require('remark-stringify');
const { unified } = require('unified');
const visitParents = require('unist-util-visit-parents');

/**
 * Updates the markdown content for better UX and compatibility with Docusaurus v3.
 * @param {string} changelog The markdown content.
 * @returns {string} The updated markdown content.
 */
function updateChangelog(changelog) {
    const pipeline = unified()
        .use(remarkParse)
        .use(incrementHeadingLevels)
        .use(prettifyPRLinks)
        .use(linkifyUserTags)
        .use(remarkStringify);

    changelog = pipeline.processSync(changelog).toString();
    changelog = addFrontmatter(changelog);
    changelog = escapeMDXCharacters(changelog);
    return changelog;
}

/**
 * Bumps the headings levels in the markdown content. This function increases the depth
 * of all headings in the content by 1. This is useful when the content is included in
 * another markdown file with a higher-level heading.
 * @param {*} tree Remark AST tree.
 * @returns {void} Nothing. This function modifies the tree in place.
 */
const incrementHeadingLevels = () => (tree) => {
    visitParents(tree, 'heading', (node) => {
        node.depth += 1;
    });
};

/**
 * Links user tags in the markdown content. This function replaces the user tags
 * (e.g. `@username`) with a link to the user's GitHub profile (just like GitHub's UI).
 * @param {*} tree Remark AST tree.
 * @returns {void} Nothing. This function modifies the tree in place.
 */
const linkifyUserTags = () => (tree) => {
    visitParents(tree, 'text', (node, parents) => {
        const userTagRegex = /@([a-zA-Z0-9-]+)(\s|$)/g;
        const match = userTagRegex.exec(node.value);

        if (!match) return;

        const directParent = parents[parents.length - 1];
        const nodeIndexInParent = directParent.children.findIndex((x) => x === node);

        const username = match[1];
        const ending = match[2] === ' ' ? ' ' : '';
        const before = node.value.slice(0, match.index);
        const after = node.value.slice(userTagRegex.lastIndex);

        const link = {
            type: 'link',
            url: `https://github.com/${username}`,
            children: [{ type: 'text', value: `@${username}` }],
        };
        node.value = before;
        directParent.children.splice(nodeIndexInParent + 1, 0, link);

        if (!after) return nodeIndexInParent + 2;

        directParent.children.splice(nodeIndexInParent + 2, 0, { type: 'text', value: `${ending}${after}` });
        return nodeIndexInParent + 3;
    });
};

/**
 * Prettifies PR links in the markdown content. Just like GitHub's UI, this function
 * replaces the full PR URL with a link represented by the PR number (prefixed by a hashtag).
 * @param {*} tree Remark AST tree.
 * @returns {void} Nothing. This function modifies the tree in place.
 */
const prettifyPRLinks = () => (tree) => {
    visitParents(tree, 'text', (node, parents) => {
        const prLinkRegex = /https:\/\/github.com\/[^\s]+\/pull\/(\d+)/g;
        const match = prLinkRegex.exec(node.value);

        if (!match) return;

        const directParent = parents[parents.length - 1];
        const nodeIndexInParent = directParent.children.findIndex((x) => x === node);

        const prNumber = match[1];
        const before = node.value.slice(0, match.index);
        const after = node.value.slice(prLinkRegex.lastIndex);

        const link = {
            type: 'link',
            url: match[0],
            children: [{ type: 'text', value: `#${prNumber}` }],
        };
        node.value = before;

        directParent.children.splice(nodeIndexInParent + 1, 0, link);
        if (!after) return nodeIndexInParent + 1;

        directParent.children.splice(nodeIndexInParent + 2, 0, { type: 'text', value: after });
        return nodeIndexInParent + 2;
    });
};

/**
 * Adds frontmatter to the markdown content.
 * @param {string} changelog The markdown content.
 * @param {string} title The frontmatter title.
 * @returns {string} The markdown content with frontmatter.
 */
function addFrontmatter(changelog, title = 'Changelog') {
    return `---
title: ${title}
sidebar_label: ${title}
toc_max_heading_level: 3
---
${changelog}`;
}

/**
 * Escapes the MDX-related characters in the markdown content.
 * This is required by Docusaurus v3 and its dependencies (see the v3 [migration guide](https://docusaurus.io/docs/migration/v3#common-mdx-problems)).
 * @param {string} changelog The markdown content.
 * @returns {string} The markdown content with escaped MDX characters.
 */
function escapeMDXCharacters(changelog) {
    return changelog.replaceAll(/<|>/g, (match) => {
        return match === '<' ? '&lt;' : '&gt;';
    }).replaceAll(/\{|\}/g, (match) => {
        return match === '{' ? '&#123;' : '&#125;';
    });
}

module.exports = {
    updateChangelog,
};


================================================
File: /apify-docs-theme/src/theme.js
================================================
const fs = require('fs');
const path = require('path');

const axios = require('axios');
const postcssPreset = require('postcss-preset-env');

const { updateChangelog } = require('./markdown');

function findPathInParent(endPath) {
    let parentPath = __dirname;
    while (parentPath !== path.join(parentPath, '..')) {
        const filePath = path.join(parentPath, endPath);
        if (fs.existsSync(filePath)) return filePath;
        parentPath = path.join(parentPath, '..');
    }
    const filePath = path.join(parentPath, endPath);
    if (fs.existsSync(filePath)) return filePath;

    return false;
}

function findPathInParentOrThrow(endPath) {
    const filePath = findPathInParent(endPath);
    if (!filePath) throw new Error(`Could not find ${endPath} in any parent directory`);
    return filePath;
}

async function generateChangelogFromGitHubReleases(paths, repo) {
    const response = await axios.get(`https://api.github.com/repos/${repo}/releases`);
    const releases = response.data;

    let markdown = '';
    if (!Array.isArray(releases) || releases.length === 0) return;

    releases.forEach((release) => {
        markdown += release.tag_name
            ? `## [${release.name}](https://github.com/${repo}/releases/tag/${release.tag_name})\n`
            : `## ${release.name}\n`;
        markdown += `${release.body.replaceAll(/(^#|\n#)/g, '###')}\n`;
    });

    paths.forEach((p) => {
        fs.writeFileSync(path.join(p, 'changelog.md'), updateChangelog(markdown));
    });
}

function copyChangelogFromRoot(paths, hasDefaultChangelog) {
    const sourceChangelogPath = findPathInParentOrThrow('CHANGELOG.md');

    for (const docsPath of paths) {
        const targetChangelogPath = path.join(docsPath, 'changelog.md');

        if (fs.existsSync(targetChangelogPath)
            && fs.statSync(targetChangelogPath).mtime >= fs.statSync(sourceChangelogPath).mtime
            && !hasDefaultChangelog.get(docsPath)) {
            continue;
        }

        const changelog = fs.readFileSync(sourceChangelogPath, 'utf-8');
        fs.writeFileSync(targetChangelogPath, updateChangelog(changelog));
    }
}

function theme(
    context,
    options,
) {
    return {
        name: '@apify/docs-theme',
        getPathsToWatch() {
            return ['./pages'];
        },
        getThemePath() {
            return '../src/theme';
        },
        getTypeScriptThemePath() {
            return '../src/theme';
        },
        async loadContent() {
            try {
                const versioned = findPathInParent('website/versioned_docs');
                const pathsToCopyChangelog = [
                    findPathInParentOrThrow('docs'),
                    ...(versioned
                        ? fs.readdirSync(versioned).map((version) => path.join(versioned, version))
                        : []
                    ),
                ];

                const hasDefaultChangelog = new Map();

                for (const p of pathsToCopyChangelog) {
                    // the changelog page has to exist for the sidebar to work - async loadContent() is (apparently) not awaited for by sidebar
                    if (fs.existsSync(path.join(p, 'changelog.md'))) continue;
                    fs.writeFileSync(`${p}/changelog.md`, `---
title: Changelog
sidebar_label: Changelog
---
It seems that the changelog is not available.
This either means that your Docusaurus setup is misconfigured, or that your GitHub repository contains no releases yet.
`);
                    hasDefaultChangelog.set(p, true);
                }

                if (options.changelogFromRoot) {
                    copyChangelogFromRoot(pathsToCopyChangelog, hasDefaultChangelog);
                } else {
                    await generateChangelogFromGitHubReleases(pathsToCopyChangelog, `${context.siteConfig.organizationName}/${context.siteConfig.projectName}`);
                }
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn(`Changelog page could not be initialized: ${e.message}`);
            }
        },
        async contentLoaded({ actions }) {
            const { setGlobalData } = actions;
            setGlobalData({
                options,
            });
        },
        getClientModules() {
            return [
                require.resolve('./theme/custom.css'),
            ];
        },
        configureWebpack() {
            return {
                module: {
                    rules: [
                        {
                            test: /(@apify\/|apify-)docs-theme\/src\/(theme|pages)\/.*?\.jsx?$/,
                            use: {
                                loader: 'babel-loader',
                            },
                        },
                    ],
                },
            };
        },
        configurePostCss(o) {
            o.plugins.push(postcssPreset); // allow newest CSS syntax
            return o;
        },
    };
}

module.exports = {
    theme,
};


================================================
File: /apify-docs-theme/src/utils.js
================================================
/**
 * @param {string} input
 */
export function isDifferentInstance(input) {
    const simplified = input.startsWith('/') ? input.slice(1) : input;

    const instanceUrls = [
        'api/client',
        'sdk',
        'cli',
    ];

    return instanceUrls.some((url) => simplified.startsWith(url));
}


================================================
File: /apify-docs-theme/src/theme/SearchMetadata/index.js
================================================
import Head from '@docusaurus/Head';
import { useThemeConfig } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';

export default function SearchMetadata({ locale, version, tag }) {
    const { siteConfig } = useDocusaurusContext();
    const language = locale;

    // keep the tag on same value for all the content, and add a new section + section tag
    const section = siteConfig.projectName;
    const sectionTag = tag;
    const { versions } = useThemeConfig();

    // normalize the latest version regardless of what number it has,
    // so we can search across all "latest versions of the docs"
    if (!version || !versions || version === versions[0]) {
        version = 'latest';
    }

    tag = `default-${version}`;

    return (
        <Head>
            {/*
        Docusaurus metadata, used by third-party search plugin
        See https://github.com/cmfcmf/docusaurus-search-local/issues/99
        */}
            {locale && <meta name="docusaurus_locale" content={locale}/>}
            {version && <meta name="docusaurus_version" content={version}/>}
            {tag && <meta name="docusaurus_tag" content={tag}/>}

            {/* Algolia DocSearch metadata */}
            {language && <meta name="docsearch:language" content={language}/>}
            {version && <meta name="docsearch:version" content={version}/>}
            <meta name="docsearch:docusaurus_tag" content={tag}/>
            <meta name="docsearch:section" content={section}/>
            <meta name="docsearch:section_tag" content={sectionTag}/>
        </Head>
    );
}


================================================
File: /apify-docs-theme/src/theme/NotFound.jsx
================================================
import React from 'react';
import { PageMetadata } from '@docusaurus/theme-common';
import Layout from '@theme/Layout';

export default function NotFound() {
    return (
        <>
            <PageMetadata title={'Page Not Found'} />
            <Layout>
                <main className="container margin-vert--xl">
                    <div className="row">
                        <div className="col col--6 col--offset-3">
                            <h1 className="hero__title">
                                Page Not Found
                            </h1>
                            <p>
                                We could not find what you were looking for 😢
                            </p>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    );
}


================================================
File: /apify-docs-theme/src/theme/Icon/DarkMode/index.jsx
================================================
/* eslint-disable max-len */
import React from 'react';

function IconDarkMode(props) {
    return (
        <svg viewBox="0 0 13 12" width={14} height={14} {...props}>
            <path d="M10.7001 6.39501C10.6215 7.24611 10.3021 8.05721 9.77927 8.7334C9.25646 9.40959 8.55189 9.92291 7.748 10.2133C6.9441 10.5036 6.07414 10.5591 5.2399 10.3731C4.40565 10.187 3.64164 9.76728 3.03726 9.1629C2.43287 8.55851 2.01312 7.7945 1.8271 6.96026C1.64108 6.12602 1.6965 5.25605 1.98688 4.45216C2.27725 3.64826 2.79056 2.94369 3.46675 2.42088C4.14294 1.89808 4.95404 1.57866 5.80515 1.50001C5.30685 2.17414 5.06707 3.00473 5.12941 3.84071C5.19175 4.6767 5.55208 5.46254 6.14485 6.05531C6.73762 6.64808 7.52346 7.0084 8.35944 7.07074C9.19542 7.13308 10.026 6.8933 10.7001 6.39501Z" stroke="currentColor" fill="transparent" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

export default React.memo(IconDarkMode);


================================================
File: /apify-docs-theme/src/theme/Icon/LightMode/index.jsx
================================================
/* eslint-disable max-len */
import React from 'react';

function IconLightMode(props) {
    return (
        <svg viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" width={14} height={14} {...props}>
            <g clipPath="url(#clip0_833_8168)">
                <path
                    d="M6.59998 8.49999C7.98069 8.49999 9.09998 7.3807 9.09998 5.99999C9.09998 4.61928 7.98069 3.49999 6.59998 3.49999C5.21926 3.49999 4.09998 4.61928 4.09998 5.99999C4.09998 7.3807 5.21926 8.49999 6.59998 8.49999Z"
                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.59985 0.5V1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.59985 10.5V11.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.7099 2.11L3.4199 2.82" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.77991 9.17999L10.4899 9.88999" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.09998 6H2.09998" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.0999 6H12.0999" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.7099 9.88999L3.4199 9.17999" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.77991 2.82L10.4899 2.11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_833_8168">
                    <rect width="12" height="12" fill="white" transform="translate(0.599976)"/>
                </clipPath>
            </defs>
        </svg>
    );
}

export default React.memo(IconLightMode);


================================================
File: /apify-docs-theme/src/theme/NavbarItem/NavbarNavLink.jsx
================================================
import isInternalUrl_ from '@docusaurus/isInternalUrl';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { isRegexpStringMatch, useThemeConfig } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import IconExternalLink from '@theme/Icon/ExternalLink';
import React from 'react';

export default function NavbarNavLink({
    activeBasePath,
    activeBaseRegex,
    to,
    href,
    label,
    html,
    isDropdownLink,
    prependBaseUrlToHref,
    ...props
}) {
    const { navbar: { items = [] } } = useThemeConfig();
    const { options: { subNavbar } } = usePluginData('@apify/docs-theme');
    const allItems = [...items, ...(subNavbar?.items || [])];
    const location = useLocation();
    // TODO all this seems hacky
    // {to: 'version'} should probably be forbidden, in favor of {to: '/version'}
    const toUrl = useBaseUrl(to);
    const activeBaseUrl = useBaseUrl(activeBasePath);
    const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
    const { siteConfig } = useDocusaurusContext();
    const isInternalUrl = (url) => {
        if (url.startsWith(siteConfig.url)) {
            return true;
        }
        return isInternalUrl_(url);
    };

    const isExternalLink = label && href && !isInternalUrl(href);
    // Link content is set through html XOR label
    const linkContentProps = html
        ? { dangerouslySetInnerHTML: { __html: html } }
        : {
            children: (
                <>
                    {label}
                    {isExternalLink && (
                        <IconExternalLink
                            {...(isDropdownLink && { width: 12, height: 12 })}
                        />
                    )}
                </>
            ),
        };

    // If the item is a dropdown, look for any of its children that match the current path
    const dropDownHasActiveItem = location.pathname !== '/' && allItems
        .filter((item) => item.type === 'dropdown')
        .filter((item) => item.label === label)
        .reduce((nestedItems, item) => [...nestedItems, ...item.items], [])
        .some((item) => (item.to || item.href).endsWith(location.pathname));

    if (href) {
        return (
            <Link
                href={prependBaseUrlToHref ? normalizedHref : href}
                {...props}
                {...(activeBaseUrl && {
                    className: location.pathname.startsWith(`/${activeBasePath}`) || dropDownHasActiveItem
                        ? 'navbar__item navbar__link navbar__link--active'
                        : 'navbar__item navbar__link',
                })}
                {...linkContentProps}
            />
        );
    }

    return (
        <Link
            to={toUrl}
            isNavLink
            {...((activeBasePath || activeBaseRegex) && {
                // eslint-disable-next-line no-shadow
                isActive: (_match, location) => (activeBaseRegex
                    ? isRegexpStringMatch(activeBaseRegex, location.pathname) || dropDownHasActiveItem
                    : location.pathname.startsWith(`/${activeBasePath}`)),
                activeClassName: 'navbar__link--active',
            })}
            {...props}
            {...linkContentProps}
        />
    );
}


================================================
File: /apify-docs-theme/src/theme/NavbarItem/ComponentTypes.jsx
================================================
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import LocaleDropdownNavbarItem from '@theme/NavbarItem/LocaleDropdownNavbarItem';
import SearchNavbarItem from '@theme/NavbarItem/SearchNavbarItem';
import HtmlNavbarItem from '@theme/NavbarItem/HtmlNavbarItem';
import DocSidebarNavbarItem from '@theme/NavbarItem/DocSidebarNavbarItem';
import DocsVersionNavbarItem from '@theme/NavbarItem/DocsVersionNavbarItem';
import DocsVersionDropdownNavbarItem from '@theme/NavbarItem/DocsVersionDropdownNavbarItem';
import { useDocsVersion, useLayoutDoc } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';

// const versions = require('../../../versions.json');
//
// const stable = versions[0];
const stable = '1';

function DocNavbarItem({
    docId,
    label: staticLabel,
    docsPluginId,
    ...props
}) {
    const doc = useLayoutDoc(docId, docsPluginId);
    // Draft items are not displayed in the navbar.
    if (doc === null) {
        return null;
    }
    return (
        <DefaultNavbarItem
            exact
            {...props}
            label={staticLabel ?? doc.id}
            to={doc.path}
        />
    );
}

function ApiNavbarItem(ctx) {
    let version = {};

    try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        version = useDocsVersion();
    } catch {
        version.version = stable;
    }

    const { siteConfig } = useDocusaurusContext();

    if (siteConfig.presets[0][1].docs.disableVersioning || version.version === stable) {
        return (
            <DefaultNavbarItem
                exact
                {...ctx}
                label={ctx.label}
                to={`reference/${ctx.to}`}
            />
        );
    }

    // skip changelog button for older versions
    if (+version.version < 3 && ctx.className === 'changelog') {
        return null;
    }

    // link directly to the old API docs under /docs/x.x/api
    if (+version.version < 3) {
        return (
            <DefaultNavbarItem
                exact
                {...ctx}
                label={ctx.label}
                to={`docs/${version.version === 'current' ? 'next' : version.version}/reference/${ctx.to}`}
            />
        );
    }

    return (
        <DefaultNavbarItem
            exact
            {...ctx}
            label={ctx.label}
            to={`reference/${version.version === 'current' ? 'next' : version.version}/${ctx.to}`}
        />
    );
}

const ComponentTypes = {
    'default': DefaultNavbarItem,
    'localeDropdown': LocaleDropdownNavbarItem,
    'search': SearchNavbarItem,
    'dropdown': DropdownNavbarItem,
    'html': HtmlNavbarItem,
    'custom-api': ApiNavbarItem,
    'doc': DocNavbarItem,
    'docSidebar': DocSidebarNavbarItem,
    'docsVersion': DocsVersionNavbarItem,
    'docsVersionDropdown': DocsVersionDropdownNavbarItem,
};
export default ComponentTypes;


================================================
File: /apify-docs-theme/src/theme/SearchBar/styles.css
================================================
:root {
  --docsearch-primary-color: var(--ifm-color-primary);
  --docsearch-text-color: var(--ifm-font-color-base);
}

.DocSearch-Button {
  margin: 0;
  transition: all var(--ifm-transition-fast)
    var(--ifm-transition-timing-default);
}

.DocSearch-Container {
  z-index: calc(var(--ifm-z-index-fixed) + 1);
}


================================================
File: /apify-docs-theme/src/theme/SearchBar/index.js
================================================
import { ApifySearch } from '@apify/docs-search-modal';
import BrowserOnly from '@docusaurus/BrowserOnly';
import RouterLink from '@docusaurus/Link';
import { useLocation, useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React, { useCallback } from 'react';

/**
 * Tests whether the given href is pointing to the current docusaurus instance (so we can use the router link).
 */
function matchesCurrentInstance(href, baseUrl) {
    if (baseUrl === '/') {
        return href.startsWith('/academy') || href.startsWith('/platform');
    }

    return href.startsWith(baseUrl);
}

export function Link(props) {
    props = { ...props };

    if (props.href.startsWith('https://docs.apify.com')) {
        props.href = props.href.substring('https://docs.apify.com'.length);
    }

    const { siteConfig } = useDocusaurusContext();

    if (matchesCurrentInstance(props.href, siteConfig.baseUrl)) {
        return <RouterLink {...props}>
            {props.children}
        </RouterLink>;
    }

    return <a {...props}>{props.children}</a>;
}

export default function SearchBar() {
    const { siteConfig } = useDocusaurusContext();
    const location = useLocation();
    const history = useHistory();

    const navigate = useCallback((href) => {
        const shortHref = href.substring('https://docs.apify.com'.length);

        if (matchesCurrentInstance(shortHref, siteConfig.baseUrl)) {
            return history.push(shortHref);
        }
        return window.location.assign(href);
    }, [history, siteConfig.baseUrl]);

    const getVersion = useCallback(() => {
        const match = location.pathname.match(/\/(\d+\.\d+|next)/);

        return match ? match[1] : 'latest';
    }, [location]);

    return (
        <BrowserOnly>
            {() => <ApifySearch
                algoliaAppId={siteConfig.themeConfig.algolia.appId}
                algoliaIndexName='test_test_apify_sdk'
                algoliaKey={siteConfig.themeConfig.algolia.apiKey}
                filters={`version:${getVersion()}`}
                navigate={navigate}
            />}
        </BrowserOnly>
    );
}


================================================
File: /apify-docs-theme/src/theme/TOCItems/index.jsx
================================================
import { useThemeConfig } from '@docusaurus/theme-common';
import {
    useTOCHighlight,
    useFilteredAndTreeifiedTOC,
} from '@docusaurus/theme-common/internal';
import TOCItemTree from '@theme/TOCItems/Tree';
import React, { useMemo } from 'react';

export default function TOCItems({
    toc,
    className = 'table-of-contents table-of-contents__left-border',
    linkClassName = 'table-of-contents__link',
    linkActiveClassName = undefined,
    minHeadingLevel: minHeadingLevelOption,
    maxHeadingLevel: maxHeadingLevelOption,
    ...props
}) {
    const themeConfig = useThemeConfig();

    const minHeadingLevel = minHeadingLevelOption ?? themeConfig.tableOfContents.minHeadingLevel;
    const maxHeadingLevel = maxHeadingLevelOption ?? themeConfig.tableOfContents.maxHeadingLevel;

    const tocTree = useFilteredAndTreeifiedTOC({
        toc,
        minHeadingLevel,
        maxHeadingLevel,
    });

    const tocHighlightConfig = useMemo(() => {
        if (linkClassName && linkActiveClassName) {
            return {
                linkClassName,
                linkActiveClassName,
                minHeadingLevel,
                maxHeadingLevel,
            };
        }
        return undefined;
    }, [linkClassName, linkActiveClassName, minHeadingLevel, maxHeadingLevel]);
    useTOCHighlight(tocHighlightConfig);

    return (
        <TOCItemTree
            toc={tocTree}
            className={className}
            linkClassName={linkClassName}
            {...props}
        />
    );
}


================================================
File: /apify-docs-theme/src/theme/TOCItems/Tree.jsx
================================================
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

// Recursive component rendering the toc tree
function TOCItemTree({
    toc,
    className,
    linkClassName,
    isChild,
}) {
    if (!toc.length) {
        return null;
    }
    return (
        <ul className={isChild ? undefined : className}>
            {toc.map((heading) => (
                <li key={heading.id}>
                    <Link
                        to={`#${heading.id}`}
                        className={clsx(styles.apifyTocLink, linkClassName ?? undefined)}
                        data-label={heading.value}
                        // Developer provided the HTML, so assume it's safe.
                        dangerouslySetInnerHTML={{ __html: heading.value }}
                    />
                    <TOCItemTree
                        isChild
                        toc={heading.children}
                        className={className}
                        linkClassName={linkClassName}
                    />
                </li>
            ))}
        </ul>
    );
}

// Memo only the tree root is enough
export default React.memo(TOCItemTree);


================================================
File: /apify-docs-theme/src/theme/TOCItems/styles.module.css
================================================
.apifyTocLink {
    display: block;
}

.apifyTocLink::before {
    display: block;
    content: attr(data-label);
    font-weight: 700;
    height: 0;
    overflow: hidden;
    visibility: hidden;
}


================================================
File: /apify-docs-theme/src/theme/MDXComponents/Details.js
================================================
import Details from '@theme/Details';
import React from 'react';

export default function MDXDetails(props) {
    const items = React.Children.toArray(props.children);
    // Split summary item from the rest to pass it as a separate prop to the
    // Details theme component
    const summary = items.find(
        (item) => React.isValidElement(item) && item.type === 'summary',
    );
    const children = <>{items.filter((item) => item !== summary)}</>;
    return (
        <Details {...props} summary={summary}>
            {children}
        </Details>
    );
}


================================================
File: /apify-docs-theme/src/theme/MDXComponents/Heading.js
================================================
import Heading from '@theme/Heading';
import React from 'react';

export default function MDXHeading(props) {
    return <Heading {...props} />;
}


================================================
File: /apify-docs-theme/src/theme/MDXComponents/Code.js
================================================
import CodeBlock from '@theme/CodeBlock';
import React, { isValidElement } from 'react';

export default function MDXCode(props) {
    const inlineElements = [
        'a',
        'abbr',
        'b',
        'br',
        'button',
        'cite',
        'code',
        'del',
        'dfn',
        'em',
        'i',
        'img',
        'input',
        'ins',
        'kbd',
        'label',
        'object',
        'output',
        'q',
        'ruby',
        's',
        'small',
        'span',
        'strong',
        'sub',
        'sup',
        'time',
        'u',
        'var',
        'wbr',
    ];
    const shouldBeInline = React.Children.toArray(props.children).every(
        (el) => (typeof el === 'string' && !el.includes('\n'))
      || (isValidElement(el) && inlineElements.includes(el.props?.mdxType)),
    );
    return shouldBeInline ? <code {...props} /> : <CodeBlock {...props} />;
}


================================================
File: /apify-docs-theme/src/theme/MDXComponents/Ul/index.js
================================================
import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

function transformUlClassName(className) {
    return clsx(
        className,
        // This class is set globally by GitHub/MDX. We keep the global class, and
        // add another class to get a task list without the default ul styling
        // See https://github.com/syntax-tree/mdast-util-to-hast/issues/28
        className?.includes('contains-task-list') && styles.containsTaskList,
    );
}

export default function MDXUl(props) {
    return <ul {...props} className={transformUlClassName(props.className)}/>;
}


================================================
File: /apify-docs-theme/src/theme/MDXComponents/Ul/styles.module.css
================================================
.containsTaskList {
  list-style: none;
}

:not(.containsTaskList > li) > .containsTaskList {
  padding-left: 0;
}


================================================
File: /apify-docs-theme/src/theme/MDXComponents/Img/index.js
================================================
import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

function transformImgClassName(className) {
    return clsx(className, styles.img);
}

export default function MDXImg(props) {
    return (
        <img
            loading="lazy"
            {...props}
            className={transformImgClassName(props.className)}
        />
    );
}


================================================
File: /apify-docs-theme/src/theme/MDXComponents/Img/styles.module.css
================================================
.img {
  height: auto;
}


================================================
File: /apify-docs-theme/src/theme/MDXComponents/A.js
================================================
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';

import { isDifferentInstance } from '../../utils';

export default function MDXA(props) {
    const { siteConfig } = useDocusaurusContext();

    // absolute links in README, e.g. in the SDK or API Client docs, need to be converted to local `to` links
    if (props.href?.startsWith(siteConfig.url) && isDifferentInstance(siteConfig.baseUrl)) {
        const { href, ...rest } = props;
        rest.to = props.href.replace(siteConfig.url + siteConfig.baseUrl, '/');
        props = rest;
    }

    // links to a different docusaurus instance cannot go through the client side navigation, we need a hard redirect
    if (props.href && isDifferentInstance(props.href)) {
        return <a {...props} onClick={((e) => {
            e.preventDefault();
            window.location.assign(props.href);
        })}>
            {props.children}
        </a>;
    }

    return <Link {...props} />;
}


================================================
File: /apify-docs-theme/src/theme/MDXComponents/Head.js
================================================
import Head from '@docusaurus/Head';
import React from 'react';
// MDX elements are wrapped through the MDX pragma. In some cases (notably usage
// with Head/Helmet) we need to unwrap those elements.
function unwrapMDXElement(element) {
    if (element.props?.mdxType && element.props.originalType) {
        const { mdxType, originalType, ...newProps } = element.props;
        return React.createElement(element.props.originalType, newProps);
    }
    return element;
}
export default function MDXHead(props) {
    const unwrappedChildren = React.Children.map(props.children, (child) => (React.isValidElement(child) ? unwrapMDXElement(child) : child),
    );
    return <Head {...props}>{unwrappedChildren}</Head>;
}


================================================
File: /apify-docs-theme/src/theme/MDXComponents/index.js
================================================
import Admonition from '@theme/Admonition';
import MDXA from '@theme/MDXComponents/A';
import MDXCode from '@theme/MDXComponents/Code';
import MDXDetails from '@theme/MDXComponents/Details';
import MDXHead from '@theme/MDXComponents/Head';
import MDXHeading from '@theme/MDXComponents/Heading';
import MDXImg from '@theme/MDXComponents/Img';
import MDXPre from '@theme/MDXComponents/Pre';
import MDXUl from '@theme/MDXComponents/Ul';
import Mermaid from '@theme/Mermaid';
import React from 'react';

import RunnableCodeBlock from '../RunnableCodeBlock/RunnableCodeBlock';

const MDXComponents = {
    head: MDXHead,
    code: MDXCode,
    a: MDXA,
    pre: MDXPre,
    Details: MDXDetails,
    ul: MDXUl,
    img: MDXImg,
    h1: (props) => <MDXHeading as="h1" {...props} />,
    h2: (props) => <MDXHeading as="h2" {...props} />,
    h3: (props) => <MDXHeading as="h3" {...props} />,
    h4: (props) => <MDXHeading as="h4" {...props} />,
    h5: (props) => <MDXHeading as="h5" {...props} />,
    h6: (props) => <MDXHeading as="h6" {...props} />,
    admonition: Admonition,
    mermaid: Mermaid,
    RunnableCodeBlock,
};
export default MDXComponents;


================================================
File: /apify-docs-theme/src/theme/SearchPage/index.js
================================================
/* eslint-disable */
import React, { useEffect, useReducer, useRef, useState } from 'react';
import clsx from 'clsx';
import algoliaSearchHelper from 'algoliasearch-helper';
import algoliaSearch from 'algoliasearch/lite';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Head from '@docusaurus/Head';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import {
    HtmlClassNameProvider,
    useEvent,
    usePluralForm,
} from '@docusaurus/theme-common';
import {
    useSearchQueryString,
    useTitleFormatter,
} from '@docusaurus/theme-common/internal';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
    useAlgoliaThemeConfig,
    useSearchResultUrlProcessor,
} from '@docusaurus/theme-search-algolia/client';
import Layout from '@theme/Layout';
import { Link } from '../SearchBar';
import styles from './styles.module.css';

// Very simple pluralization: probably good enough for now
function useDocumentsFoundPlural() {
    const { selectMessage } = usePluralForm();
    return (count) => selectMessage(
        count,
        translate(
            {
                id: 'theme.SearchPage.documentsFound.plurals',
                description:
                        'Pluralized label for "{count} documents found". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
                message: 'One document found|{count} documents found',
            },
            { count },
        ),
    );
}

function useDocsSearchVersionsHelpers() {
    const allDocsData = useAllDocsData();
    // State of the version select menus / algolia facet filters
    // docsPluginId -> versionName map
    const [searchVersions, setSearchVersions] = useState(() => Object.entries(allDocsData).reduce(
        (acc, [pluginId, pluginData]) => ({
            ...acc,
            [pluginId]: pluginData.versions[0].name,
        }),
        {},
    ),
    );
    // Set the value of a single select menu
    const setSearchVersion = (pluginId, searchVersion) => setSearchVersions((s) => ({
        ...s,
        [pluginId]: searchVersion,
    }));
    const versioningEnabled = Object.values(allDocsData).some(
        (docsData) => docsData.versions.length > 1,
    );
    return {
        allDocsData,
        versioningEnabled,
        searchVersions,
        setSearchVersion,
    };
}

// We want to display one select per versioned docs plugin instance
function SearchVersionSelectList({ docsSearchVersionsHelpers }) {
    const versionedPluginEntries = Object.entries(
        docsSearchVersionsHelpers.allDocsData,
    )
        // Do not show a version select for unversioned docs plugin instances
        .filter(([, docsData]) => docsData.versions.length > 1);
    return (
        <div
            className={clsx(
                'col',
                'col--3',
                'padding-left--none',
                styles.searchVersionColumn,
            )}>
            {versionedPluginEntries.map(([pluginId, docsData]) => {
                const labelPrefix = versionedPluginEntries.length > 1 ? `${pluginId}: ` : '';
                return (
                    <select
                        key={pluginId}
                        onChange={(e) => docsSearchVersionsHelpers.setSearchVersion(
                            pluginId,
                            e.target.value,
                        )
                        }
                        defaultValue={docsSearchVersionsHelpers.searchVersions[pluginId]}
                        className={styles.searchVersionInput}>
                        {docsData.versions.map((version, i) => (
                            <option
                                key={i}
                                label={`${labelPrefix}${version.label}`}
                                value={version.name}
                            />
                        ))}
                    </select>
                );
            })}
        </div>
    );
}

function SearchPageContent() {
    const { siteConfig, i18n: { currentLocale } } = useDocusaurusContext();
    const {
        algolia: { appId, apiKey, indexName },
    } = useAlgoliaThemeConfig();
    const processSearchResultUrl = useSearchResultUrlProcessor();
    const documentsFoundPlural = useDocumentsFoundPlural();
    const docsSearchVersionsHelpers = useDocsSearchVersionsHelpers();
    const [searchQuery, setSearchQuery] = useSearchQueryString();
    const initialSearchResultState = {
        items: [],
        query: null,
        totalResults: null,
        totalPages: null,
        lastPage: null,
        hasMore: null,
        loading: null,
    };
    const [searchResultState, searchResultStateDispatcher] = useReducer(
        (prevState, data) => {
            switch (data.type) {
                case 'reset': {
                    return initialSearchResultState;
                }
                case 'loading': {
                    return { ...prevState, loading: true };
                }
                case 'update': {
                    if (searchQuery !== data.value.query) {
                        return prevState;
                    }
                    return {
                        ...data.value,
                        items:
                            data.value.lastPage === 0
                                ? data.value.items
                                : prevState.items.concat(data.value.items),
                    };
                }
                case 'advance': {
                    const hasMore = prevState.totalPages > prevState.lastPage + 1;
                    return {
                        ...prevState,
                        lastPage: hasMore ? prevState.lastPage + 1 : prevState.lastPage,
                        hasMore,
                    };
                }
                default:
                    return prevState;
            }
        },
        initialSearchResultState,
    );
    const algoliaClient = algoliaSearch(appId, apiKey);
    const algoliaHelper = algoliaSearchHelper(algoliaClient, indexName, {
        hitsPerPage: 15,
        advancedSyntax: true,
        disjunctiveFacets: ['language', 'docusaurus_tag'],
    });

    algoliaHelper.on(
        'result',
        ({ results: { query, hits, page, nbHits, nbPages } }) => {
            if (query === '' || !Array.isArray(hits)) {
                searchResultStateDispatcher({ type: 'reset' });
                return;
            }
            const sanitizeValue = (value) => value.replace(
                /algolia-docsearch-suggestion--highlight/g,
                'search-result-match',
            );
            const items = hits.map(
                ({
                     url,
                     _highlightResult: { hierarchy },
                     _snippetResult: snippet = {},
                 }) => {
                    if (url.startsWith(siteConfig.url)) {
                        url = url.substring(siteConfig.url.length);
                    }

                    const titles = Object.keys(hierarchy).map((key) => sanitizeValue(hierarchy[key].value));
                    return {
                        title: titles.pop(),
                        url,
                        summary: snippet.content
                            ? `${sanitizeValue(snippet.content.value)}...`
                            : '',
                        breadcrumbs: titles,
                    };
                },
            );
            searchResultStateDispatcher({
                type: 'update',
                value: {
                    items,
                    query,
                    totalResults: nbHits,
                    totalPages: nbPages,
                    lastPage: page,
                    hasMore: nbPages > page + 1,
                    loading: false,
                },
            });
        },
    );
    const [loaderRef, setLoaderRef] = useState(null);
    const prevY = useRef(0);
    const observer = useRef(
        ExecutionEnvironment.canUseIntersectionObserver
        && new IntersectionObserver(
            (entries) => {
                const {
                    isIntersecting,
                    boundingClientRect: { y: currentY },
                } = entries[0];
                if (isIntersecting && prevY.current > currentY) {
                    searchResultStateDispatcher({ type: 'advance' });
                }
                prevY.current = currentY;
            },
            { threshold: 1 },
        ),
    );
    const getTitle = () => (searchQuery
        ? translate(
            {
                id: 'theme.SearchPage.existingResultsTitle',
                message: 'Search results for "{query}"',
                description: 'The search page title for non-empty query',
            },
            {
                query: searchQuery,
            },
        )
        : translate({
            id: 'theme.SearchPage.emptyResultsTitle',
            message: 'Search the documentation',
            description: 'The search page title for empty query',
        }));
    const makeSearch = useEvent((page = 0) => {
        algoliaHelper.addDisjunctiveFacetRefinement('docusaurus_tag', 'default-latest');
        algoliaHelper.addDisjunctiveFacetRefinement('language', currentLocale);
        Object.entries(docsSearchVersionsHelpers.searchVersions).forEach(
            ([pluginId, searchVersion]) => {
                algoliaHelper.addDisjunctiveFacetRefinement(
                    'docusaurus_tag',
                    `docs-${pluginId}-${searchVersion}`,
                );
            },
        );
        algoliaHelper.setQuery(searchQuery).setPage(page).search();
    });
    useEffect(() => {
        if (!loaderRef) {
            return undefined;
        }
        const currentObserver = observer.current;
        if (currentObserver) {
            currentObserver.observe(loaderRef);
            return () => currentObserver.unobserve(loaderRef);
        }
        return () => true;
    }, [loaderRef]);
    useEffect(() => {
        searchResultStateDispatcher({ type: 'reset' });
        if (searchQuery) {
            searchResultStateDispatcher({ type: 'loading' });
            setTimeout(() => {
                makeSearch();
            }, 300);
        }
    }, [searchQuery, docsSearchVersionsHelpers.searchVersions, makeSearch]);
    useEffect(() => {
        if (!searchResultState.lastPage || searchResultState.lastPage === 0) {
            return;
        }
        makeSearch(searchResultState.lastPage);
    }, [makeSearch, searchResultState.lastPage]);
    return (
        <Layout>
            <Head>
                <title>{useTitleFormatter(getTitle())}</title>
                {/*
         We should not index search pages
          See https://github.com/facebook/docusaurus/pull/3233
        */}
                <meta property="robots" content="noindex, follow"/>
            </Head>

            <div className="container margin-vert--lg">
                <h1>{getTitle()}</h1>

                <form className="row" onSubmit={(e) => e.preventDefault()}>
                    <div
                        className={clsx('col', styles.searchQueryColumn, {
                            'col--9': docsSearchVersionsHelpers.versioningEnabled,
                            'col--12': !docsSearchVersionsHelpers.versioningEnabled,
                        })}>
                        <input
                            type="search"
                            name="q"
                            className={styles.searchQueryInput}
                            placeholder={translate({
                                id: 'theme.SearchPage.inputPlaceholder',
                                message: 'Type your search here',
                                description: 'The placeholder for search page input',
                            })}
                            aria-label={translate({
                                id: 'theme.SearchPage.inputLabel',
                                message: 'Search',
                                description: 'The ARIA label for search page input',
                            })}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                            autoComplete="off"
                            autoFocus
                        />
                    </div>

                    {docsSearchVersionsHelpers.versioningEnabled && (
                        <SearchVersionSelectList
                            docsSearchVersionsHelpers={docsSearchVersionsHelpers}
                        />
                    )}
                </form>

                <div className="row">
                    <div className={clsx('col', 'col--8', styles.searchResultsColumn)}>
                        {!!searchResultState.totalResults
                            && documentsFoundPlural(searchResultState.totalResults)}
                    </div>

                    <div
                        className={clsx(
                            'col',
                            'col--4',
                            'text--right',
                            styles.searchLogoColumn,
                        )}>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.algolia.com/"
                            aria-label={translate({
                                id: 'theme.SearchPage.algoliaLabel',
                                message: 'Search by Algolia',
                                description: 'The ARIA label for Algolia mention',
                            })}>
                            <svg viewBox="0 0 168 24" className={styles.algoliaLogo}>
                                <g fill="none">
                                    <path
                                        className={styles.algoliaLogoPathFill}
                                        d="M120.925 18.804c-4.386.02-4.386-3.54-4.386-4.106l-.007-13.336 2.675-.424v13.254c0 .322 0 2.358 1.718 2.364v2.248zm-10.846-2.18c.821 0 1.43-.047 1.855-.129v-2.719a6.334 6.334 0 0 0-1.574-.199 5.7 5.7 0 0 0-.897.069 2.699 2.699 0 0 0-.814.24c-.24.116-.439.28-.582.491-.15.212-.219.335-.219.656 0 .628.219.991.616 1.23s.938.362 1.615.362zm-.233-9.7c.883 0 1.629.109 2.231.328.602.218 1.088.525 1.444.915.363.396.609.922.76 1.483.157.56.232 1.175.232 1.85v6.874a32.5 32.5 0 0 1-1.868.314c-.834.123-1.772.185-2.813.185-.69 0-1.327-.069-1.895-.198a4.001 4.001 0 0 1-1.471-.636 3.085 3.085 0 0 1-.951-1.134c-.226-.465-.343-1.12-.343-1.803 0-.656.13-1.073.384-1.525a3.24 3.24 0 0 1 1.047-1.106c.445-.287.95-.492 1.532-.615a8.8 8.8 0 0 1 1.82-.185 8.404 8.404 0 0 1 1.972.24v-.438c0-.307-.035-.6-.11-.874a1.88 1.88 0 0 0-.384-.73 1.784 1.784 0 0 0-.724-.493 3.164 3.164 0 0 0-1.143-.205c-.616 0-1.177.075-1.69.164a7.735 7.735 0 0 0-1.26.307l-.321-2.192c.335-.117.834-.233 1.478-.349a10.98 10.98 0 0 1 2.073-.178zm52.842 9.626c.822 0 1.43-.048 1.854-.13V13.7a6.347 6.347 0 0 0-1.574-.199c-.294 0-.595.021-.896.069a2.7 2.7 0 0 0-.814.24 1.46 1.46 0 0 0-.582.491c-.15.212-.218.335-.218.656 0 .628.218.991.615 1.23.404.245.938.362 1.615.362zm-.226-9.694c.883 0 1.629.108 2.231.327.602.219 1.088.526 1.444.915.355.39.609.923.759 1.483a6.8 6.8 0 0 1 .233 1.852v6.873c-.41.088-1.034.19-1.868.314-.834.123-1.772.184-2.813.184-.69 0-1.327-.068-1.895-.198a4.001 4.001 0 0 1-1.471-.635 3.085 3.085 0 0 1-.951-1.134c-.226-.465-.343-1.12-.343-1.804 0-.656.13-1.073.384-1.524.26-.45.608-.82 1.047-1.107.445-.286.95-.491 1.532-.614a8.803 8.803 0 0 1 2.751-.13c.329.034.671.096 1.04.185v-.437a3.3 3.3 0 0 0-.109-.875 1.873 1.873 0 0 0-.384-.731 1.784 1.784 0 0 0-.724-.492 3.165 3.165 0 0 0-1.143-.205c-.616 0-1.177.075-1.69.164a7.75 7.75 0 0 0-1.26.307l-.321-2.193c.335-.116.834-.232 1.478-.348a11.633 11.633 0 0 1 2.073-.177zm-8.034-1.271a1.626 1.626 0 0 1-1.628-1.62c0-.895.725-1.62 1.628-1.62.904 0 1.63.725 1.63 1.62 0 .895-.733 1.62-1.63 1.62zm1.348 13.22h-2.689V7.27l2.69-.423v11.956zm-4.714 0c-4.386.02-4.386-3.54-4.386-4.107l-.008-13.336 2.676-.424v13.254c0 .322 0 2.358 1.718 2.364v2.248zm-8.698-5.903c0-1.156-.253-2.119-.746-2.788-.493-.677-1.183-1.01-2.067-1.01-.882 0-1.574.333-2.065 1.01-.493.676-.733 1.632-.733 2.788 0 1.168.246 1.953.74 2.63.492.683 1.183 1.018 2.066 1.018.882 0 1.574-.342 2.067-1.019.492-.683.738-1.46.738-2.63zm2.737-.007c0 .902-.13 1.584-.397 2.33a5.52 5.52 0 0 1-1.128 1.906 4.986 4.986 0 0 1-1.752 1.223c-.685.286-1.739.45-2.265.45-.528-.006-1.574-.157-2.252-.45a5.096 5.096 0 0 1-1.744-1.223c-.487-.527-.863-1.162-1.137-1.906a6.345 6.345 0 0 1-.41-2.33c0-.902.123-1.77.397-2.508a5.554 5.554 0 0 1 1.15-1.892 5.133 5.133 0 0 1 1.75-1.216c.679-.287 1.425-.423 2.232-.423.808 0 1.553.142 2.237.423a4.88 4.88 0 0 1 1.753 1.216 5.644 5.644 0 0 1 1.135 1.892c.287.738.431 1.606.431 2.508zm-20.138 0c0 1.12.246 2.363.738 2.882.493.52 1.13.78 1.91.78.424 0 .828-.062 1.204-.178.377-.116.677-.253.917-.417V9.33a10.476 10.476 0 0 0-1.766-.226c-.971-.028-1.71.37-2.23 1.004-.513.636-.773 1.75-.773 2.788zm7.438 5.274c0 1.824-.466 3.156-1.404 4.004-.936.846-2.367 1.27-4.296 1.27-.705 0-2.17-.137-3.34-.396l.431-2.118c.98.205 2.272.26 2.95.26 1.074 0 1.84-.219 2.299-.656.459-.437.684-1.086.684-1.948v-.437a8.07 8.07 0 0 1-1.047.397c-.43.13-.93.198-1.492.198-.739 0-1.41-.116-2.018-.349a4.206 4.206 0 0 1-1.567-1.025c-.431-.45-.774-1.017-1.013-1.694-.24-.677-.363-1.885-.363-2.773 0-.834.13-1.88.384-2.577.26-.696.629-1.298 1.129-1.796.493-.498 1.095-.881 1.8-1.162a6.605 6.605 0 0 1 2.428-.457c.87 0 1.67.109 2.45.24.78.129 1.444.265 1.985.415V18.17zM6.972 6.677v1.627c-.712-.446-1.52-.67-2.425-.67-.585 0-1.045.13-1.38.391a1.24 1.24 0 0 0-.502 1.03c0 .425.164.765.494 1.02.33.256.835.532 1.516.83.447.192.795.356 1.045.495.25.138.537.332.862.582.324.25.563.548.718.894.154.345.23.741.23 1.188 0 .947-.334 1.691-1.004 2.234-.67.542-1.537.814-2.601.814-1.18 0-2.16-.229-2.936-.686v-1.708c.84.628 1.814.942 2.92.942.585 0 1.048-.136 1.388-.407.34-.271.51-.646.51-1.125 0-.287-.1-.55-.302-.79-.203-.24-.42-.42-.655-.542-.234-.123-.585-.29-1.053-.503a61.27 61.27 0 0 1-.582-.271 13.67 13.67 0 0 1-.55-.287 4.275 4.275 0 0 1-.567-.351 6.92 6.92 0 0 1-.455-.4c-.18-.17-.31-.34-.39-.51-.08-.17-.155-.37-.224-.598a2.553 2.553 0 0 1-.104-.742c0-.915.333-1.638.998-2.17.664-.532 1.523-.798 2.576-.798.968 0 1.793.17 2.473.51zm7.468 5.696v-.287c-.022-.607-.187-1.088-.495-1.444-.309-.357-.75-.535-1.324-.535-.532 0-.99.194-1.373.583-.382.388-.622.949-.717 1.683h3.909zm1.005 2.792v1.404c-.596.34-1.383.51-2.362.51-1.255 0-2.255-.377-3-1.132-.744-.755-1.116-1.744-1.116-2.968 0-1.297.34-2.316 1.021-3.055.68-.74 1.548-1.11 2.6-1.11 1.033 0 1.852.323 2.458.966.606.644.91 1.572.91 2.784 0 .33-.033.676-.096 1.038h-5.314c.107.702.405 1.239.894 1.611.49.372 1.106.558 1.85.558.862 0 1.58-.202 2.155-.606zm6.605-1.77h-1.212c-.596 0-1.045.116-1.349.35-.303.234-.454.532-.454.894 0 .372.117.664.35.877.235.213.575.32 1.022.32.51 0 .912-.142 1.204-.424.293-.281.44-.651.44-1.108v-.91zm-4.068-2.554V9.325c.627-.361 1.457-.542 2.489-.542 2.116 0 3.175 1.026 3.175 3.08V17h-1.548v-.957c-.415.68-1.143 1.02-2.186 1.02-.766 0-1.38-.22-1.843-.661-.462-.442-.694-1.003-.694-1.684 0-.776.293-1.38.878-1.81.585-.431 1.404-.647 2.457-.647h1.34V11.8c0-.554-.133-.971-.399-1.253-.266-.282-.707-.423-1.324-.423a4.07 4.07 0 0 0-2.345.718zm9.333-1.93v1.42c.394-1 1.101-1.5 2.123-1.5.148 0 .313.016.494.048v1.531a1.885 1.885 0 0 0-.75-.143c-.542 0-.989.24-1.34.718-.351.479-.527 1.048-.527 1.707V17h-1.563V8.91h1.563zm5.01 4.084c.022.82.272 1.492.75 2.019.479.526 1.15.79 2.01.79.639 0 1.235-.176 1.788-.527v1.404c-.521.319-1.186.479-1.995.479-1.265 0-2.276-.4-3.031-1.197-.755-.798-1.133-1.792-1.133-2.984 0-1.16.38-2.151 1.14-2.975.761-.825 1.79-1.237 3.088-1.237.702 0 1.346.149 1.93.447v1.436a3.242 3.242 0 0 0-1.77-.495c-.84 0-1.513.266-2.019.798-.505.532-.758 1.213-.758 2.042zM40.24 5.72v4.579c.458-1 1.293-1.5 2.505-1.5.787 0 1.42.245 1.899.734.479.49.718 1.17.718 2.042V17h-1.564v-5.106c0-.553-.14-.98-.422-1.284-.282-.303-.652-.455-1.11-.455-.531 0-1.002.202-1.411.606-.41.405-.615 1.022-.615 1.851V17h-1.563V5.72h1.563zm14.966 10.02c.596 0 1.096-.253 1.5-.758.404-.506.606-1.157.606-1.955 0-.915-.202-1.62-.606-2.114-.404-.495-.92-.742-1.548-.742-.553 0-1.05.224-1.491.67-.442.447-.662 1.133-.662 2.058 0 .958.212 1.67.638 2.138.425.469.946.703 1.563.703zM53.004 5.72v4.42c.574-.894 1.388-1.341 2.44-1.341 1.022 0 1.857.383 2.506 1.149.649.766.973 1.781.973 3.047 0 1.138-.309 2.109-.925 2.912-.617.803-1.463 1.205-2.537 1.205-1.075 0-1.894-.447-2.457-1.34V17h-1.58V5.72h1.58zm9.908 11.104l-3.223-7.913h1.739l1.005 2.632 1.26 3.415c.096-.32.48-1.458 1.15-3.415l.909-2.632h1.66l-2.92 7.866c-.777 2.074-1.963 3.11-3.559 3.11a2.92 2.92 0 0 1-.734-.079v-1.34c.17.042.351.064.543.064 1.032 0 1.755-.57 2.17-1.708z"
                                    />
                                    <path
                                        fill="#5468FF"
                                        d="M78.988.938h16.594a2.968 2.968 0 0 1 2.966 2.966V20.5a2.967 2.967 0 0 1-2.966 2.964H78.988a2.967 2.967 0 0 1-2.966-2.964V3.897A2.961 2.961 0 0 1 78.988.938z"
                                    />
                                    <path
                                        fill="white"
                                        d="M89.632 5.967v-.772a.978.978 0 0 0-.978-.977h-2.28a.978.978 0 0 0-.978.977v.793c0 .088.082.15.171.13a7.127 7.127 0 0 1 1.984-.28c.65 0 1.295.088 1.917.259.082.02.164-.04.164-.13m-6.248 1.01l-.39-.389a.977.977 0 0 0-1.382 0l-.465.465a.973.973 0 0 0 0 1.38l.383.383c.062.061.15.047.205-.014.226-.307.472-.601.746-.874.281-.28.568-.526.883-.751.068-.042.075-.137.02-.2m4.16 2.453v3.341c0 .096.104.165.192.117l2.97-1.537c.068-.034.089-.117.055-.184a3.695 3.695 0 0 0-3.08-1.866c-.068 0-.136.054-.136.13m0 8.048a4.489 4.489 0 0 1-4.49-4.482 4.488 4.488 0 0 1 4.49-4.482 4.488 4.488 0 0 1 4.489 4.482 4.484 4.484 0 0 1-4.49 4.482m0-10.85a6.363 6.363 0 1 0 0 12.729 6.37 6.37 0 0 0 6.372-6.368 6.358 6.358 0 0 0-6.371-6.36"
                                    />
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>

                {searchResultState.items.length > 0 ? (
                    <main>
                        {searchResultState.items.map(
                            ({ title, url, summary, breadcrumbs }, i) => (
                                <article key={i} className={styles.searchResultItem}>
                                    <h2 className={styles.searchResultItemHeading}>
                                        <Link href={url} dangerouslySetInnerHTML={{ __html: title }}/>
                                    </h2>

                                    {breadcrumbs.length > 0 && (
                                        <nav aria-label="breadcrumbs">
                                            <ul
                                                className={clsx(
                                                    'breadcrumbs',
                                                    styles.searchResultItemPath,
                                                )}>
                                                {breadcrumbs.map((html, index) => (
                                                    <li
                                                        key={index}
                                                        className="breadcrumbs__item"
                                                        // Developer provided the HTML, so assume it's safe.
                                                        dangerouslySetInnerHTML={{ __html: html }}
                                                    />
                                                ))}
                                            </ul>
                                        </nav>
                                    )}

                                    {summary && (
                                        <p
                                            className={styles.searchResultItemSummary}
                                            // Developer provided the HTML, so assume it's safe.
                                            dangerouslySetInnerHTML={{ __html: summary }}
                                        />
                                    )}
                                </article>
                            ),
                        )}
                    </main>
                ) : (
                    [
                        searchQuery && !searchResultState.loading && (
                            <p key="no-results">
                                <Translate
                                    id="theme.SearchPage.noResultsText"
                                    description="The paragraph for empty search result">
                                    No results were found
                                </Translate>
                            </p>
                        ),
                        !!searchResultState.loading && (
                            <div key="spinner" className={styles.loadingSpinner}/>
                        ),
                    ]
                )}

                {searchResultState.hasMore && (
                    <div className={styles.loader} ref={setLoaderRef}>
                        <Translate
                            id="theme.SearchPage.fetchingNewResults"
                            description="The paragraph for fetching new search results">
                            Fetching new results...
                        </Translate>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default function SearchPage() {
    return (
        <HtmlClassNameProvider className="search-page-wrapper">
            <SearchPageContent/>
        </HtmlClassNameProvider>
    );
}


================================================
File: /apify-docs-theme/src/theme/SearchPage/styles.module.css
================================================
.searchQueryInput,
.searchVersionInput {
  border-radius: var(--ifm-global-radius);
  border: 2px solid var(--ifm-toc-border-color);
  font: var(--ifm-font-size-base) var(--ifm-font-family-base);
  padding: 12.8px;
  width: 100%;
  background: var(--docsearch-searchbox-focus-background);
  color: var(--docsearch-text-color);
  margin-bottom: 8px;
  transition: border var(--ifm-transition-fast) ease;
}

.searchQueryInput:focus,
.searchVersionInput:focus {
  border-color: var(--docsearch-primary-color);
  outline: none;
}

.searchQueryInput::placeholder {
  color: var(--docsearch-muted-color);
}

.searchResultsColumn {
  font-size: 14.4px;
  font-weight: bold;
}

.algoliaLogo {
  max-width: 150px;
}

.algoliaLogoPathFill {
  fill: var(--ifm-font-color-base);
}

.searchResultItem {
  padding: 16px 0;
  border-bottom: 1px solid var(--ifm-toc-border-color);
}

.searchResultItemHeading {
  font-weight: 400;
  margin-bottom: 0;
}

.searchResultItemPath {
  font-size: 12.8px;
  color: var(--ifm-color-content-secondary);
  --ifm-breadcrumb-separator-size-multiplier: 1;
}

.searchResultItemSummary {
  margin: 8px 0 0;
  font-style: italic;
}

@media only screen and (max-width: 996px) {
  .searchQueryColumn {
    max-width: 60% !important;
  }

  .searchVersionColumn {
    max-width: 40% !important;
  }

  .searchResultsColumn {
    max-width: 60% !important;
  }

  .searchLogoColumn {
    max-width: 40% !important;
    padding-left: 0 !important;
  }
}

@media screen and (max-width: 576px) {
  .searchQueryColumn {
    max-width: 100% !important;
  }

  .searchVersionColumn {
    max-width: 100% !important;
    padding-left: var(--ifm-spacing-horizontal) !important;
  }
}

.loadingSpinner {
  width: 48px;
  height: 48px;
  border: 0.4em solid #eee;
  border-top-color: var(--ifm-color-primary);
  border-radius: 50%;
  animation: loading-spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes loading-spin {
  100% {
    transform: rotate(360deg);
  }
}

.loader {
  margin-top: 32px;
}

:global(.search-result-match) {
  color: var(--docsearch-hit-color);
  background: rgb(255 215 142 / 25%);
  padding: 0.09em 0;
}


================================================
File: /apify-docs-theme/src/theme/DocSidebarItem/Link/index.jsx
================================================
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { isActiveSidebarItem } from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import styles from './styles.module.css';

export default function DocSidebarItemLink({
    item,
    onItemClick,
    activePath,
    level,
    index,
    ...props
}) {
    const {
        href,
        label,
        className,
        autoAddBaseUrl,
    } = item;
    const isActive = isActiveSidebarItem(item, activePath);
    const isInternalLink = isInternalUrl(href);
    const baseUrl = useDocusaurusContext().siteConfig.url;

    if (href.startsWith(baseUrl)) {
        props.target = '_self';
    }

    if (item.customProps) {
        for (const key of Object.keys(item.customProps)) {
            props[`data-${key}`] = item.customProps[key];
        }
    }

    return (
        <li
            className={clsx(
                ThemeClassNames.docs.docSidebarItemLink,
                ThemeClassNames.docs.docSidebarItemLinkLevel(level),
                'menu__list-item',
                className,
            )}
            key={label}>
            <Link
                className={clsx(
                    'menu__link',
                    !isInternalLink && styles.menuExternalLink,
                    {
                        'menu__link--active': isActive,
                    },
                )}
                autoAddBaseUrl={autoAddBaseUrl}
                aria-current={isActive ? 'page' : undefined}
                to={href}
                {...(isInternalLink && {
                    onClick: onItemClick ? () => onItemClick(item) : undefined,
                })}
                {...props}>
                {label}
                {!isInternalLink && <IconExternalLink />}
            </Link>
        </li>
    );
}


================================================
File: /apify-docs-theme/src/theme/DocSidebarItem/Link/styles.module.css
================================================
.menuExternalLink {
  align-items: center;
}


================================================
File: /apify-docs-theme/src/theme/custom.css
================================================
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700&display=swap');

html[data-theme='dark'] {
    --ifm-navbar-background-color: #1a1b23;
    --ifm-background-color: #1a1b23;
    --ifm-background-surface-color: #242736;

    --ifm-font-color-base: #f2f3fb;

    --ifm-pre-background: #242736;

    --ifm-color-primary: #5d9df1;
    --ifm-link-color: #5d9df1;
    --ifm-heading-color: #f2f3fb;
    --ifm-navbar-link-color: #f2f3fb;

    /* TODO set this conditionally to 123px when there is second level nav */
    --ifm-navbar-height: 68px;
    --ifm-line-height-base: 1.65;

    --ifm-code-background: var(--ifm-pre-background) !important;
    --ifm-footer-title-color: #f2f3fb;
    --ifm-footer-link-color: #8d92af;

    --docusaurus-highlighted-code-line-bg: rgba(255, 255, 255, 0.1);
    --docsearch-text-color: #8d92af;

    /* TRON colors */
    --color-Neutral_Text: #F3F4FA;
    --color-Neutral_TextMuted: #b0b8d1;
    --color-Neutral_Border: #d1d5e4;
    --color-Neutral_Hover: #2a2d39;
    --color-Neutral_Background: #1A1B21;
    --color-Neutral_BackgroundMuted: #252832;
    --color-Neutral_ChipBackground: #555d76;
    --color-Neutral_ChipBackgroundActive: #8C93A8;
    --color-Neutral_SeparatorSubtle: #31384d;
    --color-Primary_ChipText: #8ebcff;
    --color-Primary_ChipBackground: #1a3a78;
    --color-Primary_TextInteractive: #6f9dff;

    /* EXPERIMENT: tokens for shared components */
    --color-neutral-text: #f3f4fa;
    --color-neutral-text-muted: #b2b8cc;
    --color-neutral-text-subtle: #8c93a8;
    --color-neutral-text-disabled: #575d71;
    --color-neutral-text-on-primary: #1a1b21;
    --color-neutral-icon-on-primary: #1a1b21;
    --color-neutral-background: #1a1b21;
    --color-neutral-background-muted: #252832;
    --color-neutral-background-subtle: #2a2d39;
    --color-neutral-background-white: #f3f4fa;
    --color-neutral-card-background: #1e2027;
    --color-neutral-border: #414758;
    --color-neutral-separator-subtle: #343847;
    --color-neutral-hover: #2D313E;
    --color-neutral-disabled: #343847;
    --color-neutral-overflow: #2a2d39;
    --color-neutral-icon: #b2b8cc;
    --color-neutral-icon-subtle: #6e758a;
    --color-neutral-icon-disabled: #575d71;
    --color-neutral-field-border: #343847;
    --color-neutral-action-secondary: #575d71;
    --color-neutral-action-secondary-hover: #6e758a;
    --color-neutral-action-secondary-active: #343847;
    --color-neutral-chip-background: #575d71;
    --color-neutral-chip-background-hover: #6e758a;
    --color-neutral-chip-background-active: #8c93a8;
    --color-neutral-chip-background-disabled: #8c93a8;
    --color-neutral-large-tooltip-background: #2a2d39;
    --color-neutral-large-tooltip-border: #343847;
    --color-neutral-small-tooltip-background: #1a1b21;
    --color-neutral-small-tooltip-border: #252832;
    --color-neutral-overlay: #101114cc;
    --color-neutral-field-background: #101114;
    --color-neutral-text-placeholder: #6e758a;
    --color-primary-text: #6f9dff;
    --color-primary-text-interactive: #6f9dff;
    --color-primary-icon: #3970d7;
    --color-primary-action: #5990ff;
    --color-primary-action-hover: #80a9ff;
    --color-primary-action-active: #3970d7;
    --color-primary-field-border-active: #3970d7;
    --color-primary-chip-background: #1a3a78;
    --color-primary-chip-background-hover: #194594;
    --color-primary-chip-text: #8ebcff;
    --color-primary-shadow-active: #295cbb;
    --color-success-text: #3bb358;
    --color-success-icon: #23a64a;
    --color-success-background-subtle: #0f2b14;
    --color-success-background-subtle-hover: #14441f;
    --color-success-background-subtle-active: #006e29;
    --color-success-border: #068a35;
    --color-success-border-subtle: #006e29;
    --color-success-action: #23a64a;
    --color-success-action-hover: #3bb358;
    --color-success-action-active: #068a35;
    --color-success-chip-background: #14441f;
    --color-success-chip-background-hover: #00531e;
    --color-success-chip-text: #6ccd7c;
    --color-warning-text: #f9ce4b;
    --color-warning-icon: #f5bc38;
    --color-warning-background-subtle: #3f1b07;
    --color-warning-border-subtle: #8a4f05;
    --color-warning-field-border: #cf9117;
    --color-warning-chip-background: #5d2e0e;
    --color-warning-chip-background-hover: #6d3806;
    --color-warning-chip-text: #f9ce4b;
    --color-danger-text: #ff7157;
    --color-danger-icon: #ef6045;
    --color-danger-background-subtle: #40191b;
    --color-danger-background-subtle-hover: #672523;
    --color-danger-background-subtle-active: #aa3229;
    --color-danger-border: #cf4436;
    --color-danger-border-subtle: #aa3229;
    --color-danger-field-border: #ef6045;
    --color-danger-action: #ef6045;
    --color-danger-action-hover: #ff7157;
    --color-danger-action-active: #cf4436;
    --color-danger-chip-background: #672523;
    --color-danger-chip-background-hover: #812420;
    --color-danger-chip-text: #fe9e8a;
}

:root {
    /* use default system font based on https://devhints.io/css-system-font-stack */
    --ifm-font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI',
        'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
    --ifm-heading-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
        'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
    --ifm-font-weight-semibold: 600;
    --ifm-font-color-base: #242736;

    --ifm-navbar-item-padding-horizontal: 28px;
    --ifm-navbar-link-color: #41465d;
    --ifm-navbar-shadow: none;

    --ifm-heading-margin-top: var(--ifm-heading-margin-bottom);
    --ifm-hero-background-color: transparent;

    --ifm-code-padding-horizontal: 6.4px;
    --ifm-code-padding-vertical: 3.2px;

    --ifm-global-spacing: 1.6rem !important;

    --ifm-color-primary-lightest: #5d9df1;
    --ifm-color-primary-lighter: #3a87ee;
    --ifm-color-primary-light: #2e80ed;
    --ifm-color-primary: #1672eb;
    --ifm-color-primary-dark: #1266d5;
    --ifm-color-primary-darker: #1161c9;
    --ifm-color-primary-darkest: #0e50a6;

    --ifm-link-color: hsl(214, 84%, 50%);
    --ifm-link-hover-color: hsl(214, 84%, 65%);
    --ifm-link-hover-decoration: none;

    --ifm-footer-background-color: #272c3d;
    --ifm-footer-title-color: #60626e;
    --ifm-footer-link-color: #6b6e80;
    --max-layout-width: 1440px;

    --ifm-code-background: var(--ifm-pre-background);

    --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);

    --ifm-heading-color: #242736;

    --ifm-leading: calc(var(--ifm-leading-desktop) * 1.6rem);
    --ifm-list-margin: 1.6rem;
    --ifm-pre-padding: 1.6rem;

    --ifm-hr-margin-vertical: 2.4rem;

    --ifm-h1-font-size: 2.4rem;
    --ifm-h2-font-size: 2rem;
    --ifm-h3-font-size: 1.8rem;
    --ifm-h4-font-size: 1.6rem;
    --ifm-h5-font-size: 1.4rem;
    --ifm-h6-font-size: 1.2rem;

    /* TRON colors */
    --color-Neutral_Text: #242836;
    --color-Neutral_TextMuted: #3f475d;
    --color-Neutral_Border: #d0d5e9;
    --color-Neutral_Hover: #f3f4fa;
    --color-Neutral_Background: #ffffff;
    --color-Neutral_BackgroundMuted: #f8f9fc;
    --color-Neutral_ChipBackground: #e0e3f2;
    --color-Neutral_ChipBackgroundActive: #C1C6DD;
    --color-Neutral_SeparatorSubtle: #e0e3f2;
    --color-Primary_ChipText: #1A57DA;
    --color-Primary_ChipBackground: #E1EAFF;
    --color-Primary_TextInteractive: #3970d7;

    /* EXPERIMENT: tokens for shared components */
    --color-neutral-text: #242836;
    --color-neutral-text-muted: #3f475d;
    --color-neutral-text-subtle: #6c7590;
    --color-neutral-text-disabled: #c0c6de;
    --color-neutral-text-on-primary: #ffffff;
    --color-neutral-icon-on-primary: #ffffff;
    --color-neutral-background: #ffffff;
    --color-neutral-background-muted: #f8f9fc;
    --color-neutral-background-subtle: #f3f4fa;
    --color-neutral-background-white: #ffffff;
    --color-neutral-card-background: #ffffff;
    --color-neutral-border: #d0d5e9;
    --color-neutral-separator-subtle: #e0e3f2;
    --color-neutral-hover: #EEF0F8;
    --color-neutral-disabled: #f3f4fa;
    --color-neutral-overflow: #e0e3f2;
    --color-neutral-icon: #555d76;
    --color-neutral-icon-subtle: #8a93ae;
    --color-neutral-icon-disabled: #b0b8d1;
    --color-neutral-field-border: #c0c6de;
    --color-neutral-action-secondary: #d0d5e9;
    --color-neutral-action-secondary-hover: #e0e3f2;
    --color-neutral-action-secondary-active: #c0c6de;
    --color-neutral-chip-background: #e0e3f2;
    --color-neutral-chip-background-hover: #d0d5e9;
    --color-neutral-chip-background-active: #c0c6de;
    --color-neutral-chip-background-disabled: #d0d5e9;
    --color-neutral-large-tooltip-background: #ffffff;
    --color-neutral-large-tooltip-border: #e0e3f2;
    --color-neutral-small-tooltip-background: #191b22;
    --color-neutral-small-tooltip-border: #242836;
    --color-neutral-overlay: #191b2280;
    --color-neutral-field-background: #f8f9fc;
    --color-neutral-text-placeholder: #969eb8;
    --color-primary-text: #1672eb;
    --color-primary-text-interactive: #1672eb;
    --color-primary-icon: #1672eb;
    --color-primary-action: #1672eb;
    --color-primary-action-hover: #5290f9;
    --color-primary-action-active: #1a57da;
    --color-primary-field-border-active: #1672eb;
    --color-primary-chip-background: #e1eaff;
    --color-primary-chip-background-hover: #d8e2ff;
    --color-primary-chip-text: #1a57da;
    --color-primary-shadow-active: #b2c6ff;
    --color-success-text: #008a27;
    --color-success-icon: #008a27;
    --color-success-background-subtle: #e4f5e5;
    --color-success-background-subtle-hover: #cfe9d1;
    --color-success-background-subtle-active: #80da8d;
    --color-success-border: #00ab46;
    --color-success-border-subtle: #80da8d;
    --color-success-action: #008a27;
    --color-success-action-hover: #00ab46;
    --color-success-action-active: #086e08;
    --color-success-chip-background: #daefdc;
    --color-success-chip-background-hover: #cfe9d1;
    --color-success-chip-text: #086e08;
    --color-warning-text: #a96600;
    --color-warning-icon: #f5b315;
    --color-warning-background-subtle: #f9f0db;
    --color-warning-border-subtle: #f5b315;
    --color-warning-field-border: #f5b315;
    --color-warning-chip-background: #f7e8c4;
    --color-warning-chip-background-hover: #f7dfb1;
    --color-warning-chip-text: #8c4e02;
    --color-danger-text: #e3231d;
    --color-danger-icon: #e3231d;
    --color-danger-background-subtle: #fff0ec;
    --color-danger-background-subtle-hover: #fedad1;
    --color-danger-background-subtle-active: #ffb39f;
    --color-danger-border: #fa4d37;
    --color-danger-border-subtle: #ffb39f;
    --color-danger-field-border: #fa4d37;
    --color-danger-action: #e3231d;
    --color-danger-action-hover: #fa4d37;
    --color-danger-action-active: #bb0401;
    --color-danger-chip-background: #ffe3dc;
    --color-danger-chip-background-hover: #fedad1;
    --color-danger-chip-text: #bb0401;
}

.markdown h1,
.markdown h2,
.markdown h3,
.markdown h4,
.markdown h5,
.markdown h6 {
    /* Comes from the Apify design theme content typography tokens */
    --ifm-h1-font-size: 2.8rem;
    --ifm-h2-font-size: 2.4rem;
    --ifm-h3-font-size: 2rem;
    --ifm-h4-font-size: 1.8rem;
    --ifm-h5-font-size: 1.6rem;
    --ifm-h6-font-size: 1.4rem;
}

.markdown h1:first-child {
    --ifm-h1-font-size: 2.8rem;
}

@media (min-width: 768px) {
    :root {
        /* Comes from the Apify design theme content typography tokens */
        --ifm-h1-font-size: 3.2rem;
        --ifm-h2-font-size: 2.4rem;
        --ifm-h3-font-size: 2rem;
        --ifm-h4-font-size: 1.6rem;
        --ifm-h5-font-size: 1.4rem;
        --ifm-h6-font-size: 1.2rem;
    }

    .markdown h1,
        .markdown h2,
        .markdown h3,
        .markdown h4,
        .markdown h5,
        .markdown h6 {
            /* Comes from the Apify design theme content typography tokens */
            --ifm-h1-font-size: 4.2rem;
            --ifm-h2-font-size: 3.2rem;
            --ifm-h3-font-size: 2.4rem;
            --ifm-h4-font-size: 2rem;
            --ifm-h5-font-size: 1.6rem;
            --ifm-h6-font-size: 1.4rem;
        }

    .markdown h1:first-child {
        --ifm-h1-font-size: 4.2rem;
    }
}

/* Setting the base size to 10px so it's easy to use rem for scaling (1.6rem = 16px) */
html {
    font-size: 10px;
}

body {
    font-family: var(--ifm-font-family-base);
    font-size: 16px;
    line-height: 24px;
}

@font-face {
    font-family: 'Lota Grotesque';
    src: url('/font/lota.woff2') format('woff2'),
    url('/font/lota.woff') format('woff');
    font-weight: 600;
}

.navbar__item {
    font-weight: 500;
}

.navbar__sub--title > a {
    font-weight: 600;
}

.footer__title {
    font-size: 20px;
    font-weight: 600;
}

.footer__bottom a {
    opacity: 0.75;
}

.footer__copyright {
    color: var(--ifm-footer-title-color);
}

footer .col {
    margin-bottom: 32px;
}

.navbar__title {
    /* Replaced by SVG */
    display: none;
}

.navbar__inner {
    /* .container */
    padding: 10px var(--ifm-spacing-horizontal);
    width: 100%;
    background: var(--color-Neutral_Background);
}

.navbar__container {
    max-width: calc(var(--max-layout-width) - 32px);
    display: flex;
    margin: 0 auto;
    width: 100%;
}

.navbar__item.dropdown {
    padding: 0;
    display: none;
}

.dropdown__link {
    font-size: 14px;

}

.DocSearch-Button-Placeholder {
    font-size: 14px !important;
}

html .DocSearch-Button {
    border-radius: 6px !important;
    font-weight: 400 !important;
    background: #f9fafd;
    border: 1px solid #c1c6dd;

    /* Annoying, but needed */
    /* https://stackoverflow.com/questions/26140050/why-is-font-family-not-inherited-in-button-tags-automatically/26140154 */
    font-family: inherit;
}

html .DocSearch-Button .DocSearch-Search-Icon {
    color: var(--docsearch-muted-color);
}

html[data-theme="dark"] .DocSearch-Button {
    background: none;
    border: 1px solid var(--docsearch-muted-color);
}

html[data-theme="dark"] .DocSearch-Button .DocSearch-Search-Icon {
    color: var(--docsearch-muted-color);
}

.DocSearch-Button:hover {
    box-shadow: none !important;
}

.navbar {
    padding: 0;
    /* height: fit-content; */
    height: auto;
}

.navbar, .main-wrapper {
    justify-content: center;
}

.main-wrapper > div {
    max-width: var(--max-layout-width);
    margin: auto;
    width: 100%;
}

@media (max-width: 960px) {
    .main-wrapper > div {
        max-width: 100%;
    }
}

aside > div > a {
    padding-left: 0px;
}

aside > div > a > b {
    display: none;
}

.dropdown > .navbar__link::after {
    border-color: currentColor;
    border-style: solid;
    border-width: 1.6px 1.6px 0 0;
    content: '';
    display: inline-block;
    height: 6.4px;
    left: 4.8px;
    position: relative;
    vertical-align: top;
    width: 6.4px;
    top: 7px;
    transform: rotate(135deg);
    transition: all ease-in 0.2s;
    margin-right: 6px;
}

.dropdown:hover .navbar__link::after {
    transform: rotate(-45deg);
    top: 10px;
}

.navbar .icon {
    font-size: 0;
    padding: 4px;
    line-height: 0;
}

.navbar .icon::before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background-size: cover;
}

.navbar .icon[href*=github]::before {
    background-image: url('/img/github-brand.svg');
}

html[data-theme="dark"] .navbar .navbar__link[href*=github]:before {
    background-image: url('/img/github-brand-dark.svg');
}

.navbar .icon[href*=discord]::before {
    background-image: url('/img/discord-brand.svg');
}

html[data-theme="dark"] .navbar .navbar__link[href*=discord]:before {
    background-image: url('/img/discord-brand-dark.svg');
}

.navbar .icon svg[class*=iconExternalLink],
aside .icon svg[class*=iconExternalLink] {
    display: none;
}

.navbar__items {
    gap: 6px;
}

.navbar__item, .menu__link, .navbar__link {
    border-radius: 8px;
    color: var(--color-Neutral_TextMuted);
    padding: 4px 8px;
    font-size: 14px;
    line-height: 24.4px;
    transition: all ease-in 0.2s;
}

.menu__link:hover {
    background: var(--color-Neutral_Hover) !important;
}

.menu__link--active:hover {
    background: var(--color-neutral-overflow) !important;
}

.navbar__link:hover, .navbar__link--active:hover {
    color: unset;
}

.navbar__sub {
    display: none;
    background-color: var(--color-Neutral_BackgroundMuted);
    border: 1px solid var(--color-Neutral_SeparatorSubtle);
}

.navbar__sub--title {
    display: flex;
    align-items: center;
    width: 200px;
    padding-right: 8px;
    position: relative;
    border-right: 1px solid var(--color-Neutral_SeparatorSubtle);
    justify-content: center;
}

header.hero div[class^=heroButtons] {
    justify-content: inherit;
}

.markdown blockquote {
    --ifm-alert-background-color: var(--ifm-color-info-contrast-background);
    --ifm-alert-background-color-highlight: rgba(84,199,236,.15);
    --ifm-alert-foreground-color: var(--ifm-color-info-contrast-foreground);
    --ifm-alert-border-color: var(--ifm-color-info-dark);
    --ifm-code-background: var(--ifm-alert-background-color-highlight);
    --ifm-link-color: var(--ifm-alert-foreground-color);
    --ifm-link-hover-color: var(--ifm-alert-foreground-color);
    --ifm-link-decoration: underline;
    --ifm-tabs-color: var(--ifm-alert-foreground-color);
    --ifm-tabs-color-active: var(--ifm-alert-foreground-color);
    --ifm-tabs-color-active-border: var(--ifm-alert-border-color);
    background-color: var(--ifm-alert-background-color);
    border: var(--ifm-alert-border-width) solid var(--ifm-alert-border-color);
    border-left-width: var(--ifm-alert-border-left-width);
    border-radius: var(--ifm-alert-border-radius);
    box-shadow: var(--ifm-alert-shadow);
    padding: var(--ifm-alert-padding-vertical) var(--ifm-alert-padding-horizontal);
}

html[data-theme='dark'] .markdown code {
    border-color: rgba(255, 255, 255, 0.1);
}

article .card h2 {
    margin-top: 0;
}

.tsd-kind-icon,
.menu__link,
.table-of-contents__link {
    text-overflow: ellipsis;
    display: inline-block !important;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
}

.tsd-flag {
    user-select: none;
}

.tsd-panel-header .tsd-flag-group {
    margin-right: .5rem;
    margin-left: .5rem;
}

.tsd-panel .tsd-flag {
    color: #f2f3fb;
}

.menu__caret:before,
.menu__link--sublist:after {
    float: right;
}

.menu__link--sublist-caret:after {
    height: 2.5rem;
}

aside button[class*="collapseSidebarButton"] svg {
    transform: scale(.7) rotate(180deg);
}

.table-of-contents__link {
    height: 20px;
}

nav.navbar .dropdown__menu {
    min-width: 96px;
    padding-top: 1rem;
}

.navbar__logo {
    display: none;
    width: 176px;
    height: 48px;
}

.navbar-sidebar .navbar__logo {
    display: initial;
}

.navbar-sidebar .toggle_theme-src-theme-ColorModeToggle-styles-module {
    display: none;
}

.navbar-sidebar div[class*="toggle_apify-docs"] {
    display: none;
}

.navbar__link.subnav {
    font-size: 12.8px;
    padding: 5px;
}

.main-wrapper a[class*='sidebarLogo'] img {
    height: 48px;
    width: 176px;
    padding: 10px 0px;
}

html .plugin-pages h2 {
    font-size: 36px;
    line-height: 48px;
}

html .plugin-docs .theme-doc-markdown {
    font-size: 18px;
    line-height: 32px;
}

.markdown .tsd-panel li {
    margin-top: var(--ifm-list-item-margin);
}

.plugin-docs .theme-doc-markdown img {
    display: block;
    margin: 16px auto 32px;
}

html .plugin-docs .theme-doc-markdown h1 {
    font-weight: 600;
    font-size: 48px;
    line-height: 64px;
    color: #000;
}

html[data-theme='dark'] .plugin-docs .theme-doc-markdown h1 {
    color: #fff;
}

html .plugin-typedoc-api .theme-doc-markdown h1 {
    color: #000;
}

html[data-theme='dark'] .plugin-typedoc-api .theme-doc-markdown h1 {
    color: #fff;
}

html .plugin-docs .theme-doc-markdown h2 {
    font-size: 36px;
    line-height: 48px;
}

html .plugin-docs .theme-doc-markdown h3 {
    font-size: 28px;
    line-height: 36px;
    /*color: #242736;*/
}

.theme-doc-toc-desktop .table-of-contents {
    font-size: 14px;
    line-height: 20px;
}

.navbar-sidebar .menu__link.icon {
    display: none;
}

.theme-doc-sidebar-menu .menu__link,
.theme-doc-toc-desktop .table-of-contents .toc-highlight {
    height: auto;
    background: none;
}

.menu__list-item:not(:first-child) {
    margin-top: 0;
}

.theme-doc-sidebar-menu .menu__link:hover {
    background: inherit;
}

.theme-doc-sidebar-menu .menu__link {
    font-weight: 400;
}

.theme-doc-sidebar-menu .menu__link--active {
    font-weight: 700;
}

.theme-doc-sidebar-menu .menu__list-item-collapsible {
    background: none;
    border-radius: 0.8rem;
}

.theme-doc-sidebar-menu .menu__list-item-collapsible:hover {
    background: var(--color-Neutral_Hover);
}

.theme-doc-sidebar-menu .menu__list-item-collapsible--active:hover {
    background: var(--color-neutral-overflow);
}

.theme-doc-toc-desktop .table-of-contents .table-of-contents__link--active {
    font-weight: 700;
}

.navbar__link--active,
.theme-doc-sidebar-menu.menu__list .menu__link--active,
.theme-doc-sidebar-menu.menu__list .menu__list-item-collapsible--active
 {
    color: var(--color-Neutral_Text);
    background: var(--color-neutral-overflow);
}

.navbar__link:not(.navbar__link--active):hover {
    background: var(--color-Neutral_Hover);
}

html[data-theme='dark'] .theme-doc-sidebar-menu .menu__link,
html[data-theme='dark'] .theme-doc-toc-desktop .table-of-contents .toc-highlight {
    color: #b3b8d2;
}

html[data-theme='dark'] .theme-doc-sidebar-menu .menu__link--active,
html[data-theme='dark'] .theme-doc-toc-desktop .table-of-contents .table-of-contents__link--active {
    color: #f2f3fb;
}

.theme-doc-sidebar-menu .menu__link:hover,
.theme-doc-sidebar-menu .menu__link--active,
.theme-doc-toc-desktop .table-of-contents .table-of-contents__link:hover,
.theme-doc-toc-desktop .table-of-contents .table-of-contents__link--active {
    color: #242736;
}

.hero {
    position: relative;
}

.apiItemContainer .tsd-readme h1:first-child {
    display: none;
}

nav.navbar {
    transition: transform var(--ifm-transition-slow) ease;
}

nav.navbar[class*="navbarHidden"]{
    transform: translate3d(0, calc(-210%), 0);
}

.navbar__items--right a.icon,
div[class*="colorModeToggle"]
{
    display: initial;
}

div[class*="searchBox"] {
    padding-left: 0;
    position: unset;
}

.menu__link.navbar__item {
    padding: 4px 8px;
}

.menu__link, .menu__list-item > .navbar__item {
    display: flex;
}

.theme-doc-sidebar-item-category .menu__list-item-collapsible,
.theme-doc-sidebar-item-link {
    display: flex;
    align-items: center;
}

@media (min-width: 480px) {
    .navbar__logo {
        display: initial;
    }
}

@media (min-width: 997px) {
    .navbar__sub {
        display: block;
    }

    .navbar__item.dropdown {
        display: flex;
    }
}

@media (min-width: 1130px) {
    .navbar__items {
        gap: 20px;
    }
}

/* @media (min-width: 997px) and (max-width: 1250px) {
    .navbar__items--right a.icon {
        display: none;
    }
} */

@media (min-width: 997px) and (max-width: 1130px) {
    .navbar__link.changelog {
        display: none;
    }
}

@media (min-width: 997px) and (max-width: 1439px) {
    footer .col--offset-9 {
        --ifm-col-width: calc(4 / 12 * 100%);
        margin-left: calc(8 / 12 * 100%);
    }
}

html .theme-doc-sidebar-container {
    border: 0;
}

html .theme-doc-sidebar-container button {
    border: 0;
    border-radius: 10px;
}

html .table-of-contents {
    border-left: 0;
}

html .table-of-contents ul {
    border-left: 2px solid #dfe2f5;
}

.actionLink {
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
    color: var(--color-Neutral_TextMuted);
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
}

.actionLink:hover {
    color: var(--color-Primary_TextInteractive);
}

html[data-theme='dark'] .actionLink::after {
    background-image: url('/img/arrow-right-light.svg');
}

html[data-theme='dark'] .actionLink:hover::after {
    background-image: url('/img/arrow-right-primary-light.svg');
}

.actionLink::after {
    content: " ";
    display: block;
    background-image: url('/img/arrow-right.svg');
    background-size: 15px 15px;
    height: 15px;
    width: 15px;
    margin-left: 4px;
    transition: margin 200ms ease-in-out;
}

.actionLink:hover::after {
    background-image: url('/img/arrow-right-primary.svg');
    margin-left: 8px;
}


.card {
    [class*="cardTitle"] {
        font-size: 1.6rem !important;
    }

    [class*="cardDescription"] {
        font-size: 1.2rem !important;
    }
}

.cardContentWrapper {
    display: flex;
    padding-top: 1.6rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.6rem;
    align-self: stretch;
    height: 100%;
}

.cardContentWrapperText {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
}

.cardContentList {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12.8px;
    align-self: stretch;
}

@media (min-width: 997px) and (max-width: 1660px) {
    :root {
        --ifm-toc-padding-vertical: 4px;
        --ifm-toc-padding-horizontal: 4px;
    }

    .navbar__item, .menu__link, .navbar__link {
        padding: 2px 8px;
    }

    .theme-doc-sidebar-menu .menu__link,
    .theme-doc-toc-desktop .table-of-contents .toc-highlight {
        font-size: 12.8px;
    }

    .theme-doc-toc-desktop {
        margin-left: -15px;
    }

    html .plugin-docs .theme-doc-markdown {
        font-size: 16px;
        line-height: 28px;
    }
}

aside li.section-header > div > .menu__link {
    text-transform: uppercase;
    opacity: 0.8;
    font-size: 16px;
    font-weight: 700;
    margin: 0;
}

aside li.section-header.menu__list-item {
    margin-top: 15px;
    margin-bottom: 5px;
}

aside li.section-header.menu__list-item:nth-child(2) {
    margin-top: 5px;
}

aside li.section-header > .menu__list {
    padding-left: 0;
}

.beta-chip {
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 20px;
    content: 'beta';
    background: #ddd;
    font-size: 80%;
    line-height: 10px;
    padding: 3px;
    position: relative;
    top: -1px;
    margin-left: 5px;
}

html[data-theme='dark'] .beta-chip {
    background: #333;
}

a.tsd-anchor[href^="https://undefined"] {
    display: none;
}

.runnable-code-block .code-block.no-title pre + div {
    position: absolute;
    right: 170px;
    line-height: 28px;
}

.runnable-code-block .code-block button {
    height: 36px;
    margin-top: 1px;
}

.runnable-code-block:hover .code-block button {
    opacity: 0.4;
}

html[data-theme='dark'] .runnable-code-block svg .apify-logo {
    fill: #fff;
}


/* updating the sizes in the docs search modal */
.aa-DetachedContainer {
    .mx-0\.5 {
        margin-left: 0.2rem;
        margin-right: 0.2rem;
    }

    .mb-3 {
        margin-bottom: 1.2rem;
    }

    .mt-2 {
        margin-top: 0.8rem;
    }

    .h-16 {
        height: 6.4rem;
    }

    .rounded {
        border-radius: 0.4rem;
    }

    .rounded-l {
        border-top-left-radius: 0.4rem;
        border-bottom-left-radius: 0.4rem;
    }

    .p-2 {
        padding: 0.8rem;
    }

    .p-5 {
        padding: 2rem;
    }

    .p-7 {
        padding: 2.8rem;
    }

    .px-1 {
        padding-left: 0.4rem;
        padding-right: 0.4rem;
    }

    .px-3 {
        padding-left: 1.2rem;
        padding-right: 1.2rem;
    }

    .px-5 {
        padding-left: 2rem;
        padding-right: 2rem;
    }

    .px-6 {
        padding-left: 2.4rem;
        padding-right: 2.4rem;
    }

    .py-0\.5 {
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
    }

    .py-1 {
        padding-top: 0.4rem;
        padding-bottom: 0.4rem;
    }

    .py-3 {
        padding-top: 1.2rem;
        padding-bottom: 1.2rem;
    }

    .pb-6 {
        padding-bottom: 2.4rem;
    }


    .pl-10 {
        padding-left: 4rem;
    }

    .pl-3 {
        padding-left: 1.2rem;
    }

    .pl-5 {
        padding-left: 2rem;
    }


    .text-2xl {
        font-size: 2.4rem;
        line-height: 3.2rem;
    }

    .text-lg {
        font-size: 1.8rem;
        line-height: 2.8rem;
    }

    .text-sm {
        font-size: 1.4rem;
        line-height: 2rem;
    }

    .leading-6 {
        line-height: 2.4rem;
    }
}

.card-image-container_src-components-Cards-module  {
    height: 23rem !important;
& > img {
        width: 100%;
    }
}

.card_src-components-Cards-module>a>div {
    padding: 0px 1.6rem 1.6rem !important;
}

/* typography  margin and padding fixes from Infima css file */

.margin--none {
    margin: 0 !important;
}

.margin-top--none {
    margin-top: 0 !important;
}

.margin-left--none {
    margin-right: 0 !important;
}

.margin-bottom--none {
    margin-bottom: 0 !important;
}

.margin-right--none {
    margin-left: 0 !important;
}

.margin-vert--none {
    margin-bottom: 0 !important;
    margin-top: 0 !important;
}

.margin-horiz--none {
    margin-right: 0 !important;
    margin-left: 0 !important;
}

.margin--xs {
    margin: 0.4rem !important;
}

.margin-top--xs {
    margin-top: 0.4rem !important;
}

.margin-left--xs {
    margin-right: 0.4rem !important;
}

.margin-bottom--xs {
    margin-bottom: 0.4rem !important;
}

.margin-right--xs {
    margin-left: 0.4rem !important;
}

.margin-vert--xs {
    margin-bottom: 0.4rem !important;
    margin-top: 0.4rem !important;
}

.margin-horiz--xs {
    margin-right: 0.4rem !important;
    margin-left: 0.4rem !important;
}

.margin--sm {
    margin: 0.8rem !important;
}

.margin-top--sm {
    margin-top: 0.8rem !important;
}

.margin-left--sm {
    margin-right: 0.8rem !important;
}

.margin-bottom--sm {
    margin-bottom: 0.8rem !important;
}

.margin-right--sm {
    margin-left: 0.8rem !important;
}

.margin-vert--sm {
    margin-bottom: 0.8rem !important;
    margin-top: 0.8rem !important;
}

.margin-horiz--sm {
    margin-right: 0.8rem !important;
    margin-left: 0.8rem !important;
}

.margin--md {
    margin: 1.6rem !important;
}

.margin-top--md {
    margin-top: 1.6rem !important;
}

.margin-left--md {
    margin-right: 1.6rem !important;
}

.margin-bottom--md {
    margin-bottom: 1.6rem !important;
}

.margin-right--md {
    margin-left: 1.6rem !important;
}

.margin-vert--md {
    margin-bottom: 1.6rem !important;
    margin-top: 1.6rem !important;
}

.margin-horiz--md {
    margin-right: 1.6rem !important;
    margin-left: 1.6rem !important;
}

.margin--lg {
    margin: 3.2rem !important;
}

.margin-top--lg {
    margin-top: 3.2rem !important;
}

.margin-left--lg {
    margin-right: 3.2rem !important;
}

.margin-bottom--lg {
    margin-bottom: 3.2rem !important;
}

.margin-right--lg {
    margin-left: 3.2rem !important;
}

.margin-vert--lg {
    margin-bottom: 3.2rem !important;
    margin-top: 3.2rem !important;
}

.margin-horiz--lg {
    margin-right: 3.2rem !important;
    margin-left: 3.2rem !important;
}

.margin--xl {
    margin: 8rem !important;
}

.margin-top--xl {
    margin-top: 8rem !important;
}

.margin-left--xl {
    margin-right: 8rem !important;
}

.margin-bottom--xl {
    margin-bottom: 8rem !important;
}

.margin-right--xl {
    margin-left: 8rem !important;
}

.margin-vert--xl {
    margin-bottom: 8rem !important;
    margin-top: 8rem !important;
}

.margin-horiz--xl {
    margin-right: 8rem !important;
    margin-left: 8rem !important;
}

.padding--none {
    padding: 0 !important;
}

.padding-top--none {
    padding-top: 0 !important;
}

.padding-left--none {
    padding-right: 0 !important;
}

.padding-bottom--none {
    padding-bottom: 0 !important;
}

.padding-right--none {
    padding-left: 0 !important;
}

.padding-vert--none {
    padding-bottom: 0 !important;
    padding-top: 0 !important;
}

.padding-horiz--none {
    padding-right: 0 !important;
    padding-left: 0 !important;
}

.padding--xs {
    padding: 0.4rem !important;
}

.padding-top--xs {
    padding-top: 0.4rem !important;
}

.padding-left--xs {
    padding-right: 0.4rem !important;
}

.padding-bottom--xs {
    padding-bottom: 0.4rem !important;
}

.padding-right--xs {
    padding-left: 0.4rem !important;
}

.padding-vert--xs {
    padding-bottom: 0.4rem !important;
    padding-top: 0.4rem !important;
}

.padding-horiz--xs {
    padding-right: 0.4rem !important;
    padding-left: 0.4rem !important;
}

.padding--sm {
    padding: 0.8rem !important;
}

.padding-top--sm {
    padding-top: 0.8rem !important;
}

.padding-left--sm {
    padding-right: 0.8rem !important;
}

.padding-bottom--sm {
    padding-bottom: 0.8rem !important;
}

.padding-right--sm {
    padding-left: 0.8rem !important;
}

.padding-vert--sm {
    padding-bottom: 0.8rem !important;
    padding-top: 0.8rem !important;
}

.padding-horiz--sm {
    padding-right: 0.8rem !important;
    padding-left: 0.8rem !important;
}

.padding--md {
    padding: 1.6rem !important;
}

.padding-top--md {
    padding-top: 1.6rem !important;
}

.padding-left--md {
    padding-right: 1.6rem !important;
}

.padding-bottom--md {
    padding-bottom: 1.6rem !important;
}

.padding-right--md {
    padding-left: 1.6rem !important;
}

.padding-vert--md {
    padding-bottom: 1.6rem !important;
    padding-top: 1.6rem !important;
}

.padding-horiz--md {
    padding-right: 1.6rem !important;
    padding-left: 1.6rem !important;
}

.padding--lg {
    padding: 3.2rem !important;
}

.padding-top--lg {
    padding-top: 3.2rem !important;
}

.padding-left--lg {
    padding-right: 3.2rem !important;
}

.padding-bottom--lg {
    padding-bottom: 3.2rem !important;
}

.padding-right--lg {
    padding-left: 3.2rem !important;
}

.padding-vert--lg {
    padding-bottom: 3.2rem !important;
    padding-top: 3.2rem !important;
}

.padding-horiz--lg {
    padding-right: 3.2rem !important;
    padding-left: 3.2rem !important;
}

.padding--xl {
    padding: 8rem !important;
}

.padding-top--xl {
    padding-top: 8rem !important;
}

.padding-left--xl {
    padding-right: 8rem !important;
}

.padding-bottom--xl {
    padding-bottom: 8rem !important;
}

.padding-right--xl {
    padding-left: 8rem !important;
}

.padding-vert--xl {
    padding-bottom: 8rem !important;
    padding-top: 8rem !important;
}

.padding-horiz--xl {
    padding-right: 8rem !important;
    padding-left: 8rem !important;
}

/*
 * Reset the line-number counter for each .prism-code scope
 */
.prism-code {
    counter-reset: line-number;
}

/*
 * Notice the chained .language-ts class name to .prism-code
 * You can chain more languages in order to add line numbers
 */
.prism-code.language-ts .token-line::before,
.prism-code.language-typescript .token-line::before,
.prism-code.language-javascript .token-line::before,
.prism-code.language-json .token-line::before,
.prism-code.language-json5 .token-line::before,
.prism-code.language-py .token-line::before,
.prism-code.language-python .token-line::before,
.prism-code.language-dockerfile .token-line::before,
.prism-code.language-XML .token-line::before,
.prism-code.language-yaml .token-line::before,
.prism-code.language-js .token-line::before {
    counter-increment: line-number;
    content: counter(line-number);
    margin-right: calc(var(--ifm-pre-padding) * 0.8);
    text-align: right;
    min-width: 1.5rem;
    display: inline-block;
    left: var(--ifm-pre-padding);
    color: var(--color-neutral-text-subtle);
}

.theme-code-block {
    border-radius: 12px !important;
    overflow: hidden;
    border: 1px solid var(--color-neutral-border);
    box-shadow: none !important;

    div[class^="codeBlockTitle"]{
        border-bottom: 1px solid var(--color-neutral-border) !important;
        background: var(--color-neutral-background-subtle);
    }

    div[class^="buttonGroup"] button {
        opacity: 1 !important;

        &[title="Toggle word wrap"] {
            display: none;
        }
    }

}

.redocusaurus table code {
    word-break: normal;
}

.redocusaurus .menu-content div:nth-child(2) ul {
    padding-bottom: 0;
}

.redocusaurus .menu-content div:nth-child(2) div {
    display: none;
}

.apiPage .tsd-panel-header .tsd-anchor-id {
    top: -13rem;
}

iframe[src*="youtube"] {
    width: 100%;
    aspect-ratio: 16/9;
    height: auto;
    margin-bottom: 1.6rem;
}

.redocusaurus div[data-section-id] span[id] {
    margin-top: -130px;
    position: absolute;
}

.redocusaurus .openapi-clients-box {
    display: block;
    float: right;
    padding-left: 6px;
}

.redocusaurus .openapi-clients-box-heading {
    display: inline-block;
    font-family: 'San Francisco', Helvetica, Arial, sans-serif;
    color: #6C7590;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    text-transform: uppercase;
    padding-bottom: 6px;
}

.redocusaurus .openapi-clients-box-icon {
    display: block;
    padding-bottom: 6px;
}

.theme-api-markdown .openapi-clients-box {
    display: block;
    float: right;
    padding-left: 6px;
}

.theme-api-markdown .openapi-clients-box-heading {
    display: inline-block;
    font-family: 'San Francisco', Helvetica, Arial, sans-serif;
    color: #6C7590;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    text-transform: uppercase;
    padding-bottom: 6px;
}

.theme-api-markdown .openapi-clients-box-icon {
    display: block;
    padding-bottom: 6px;
    margin: 0 !important;
}

.theme-api-markdown .openapi__method-endpoint-path,
.theme-api-markdown .openapi-security__summary-header {
    margin-top: 0;
}

.theme-api-markdown .prism-code .token-line::before {
    display: none !important;
}

.menu__list-item--deprecated > .menu__link,
.menu__list-item--deprecated > .menu__link:hover {
    text-decoration: line-through;
    text-decoration-thickness: 2px !important;
}

.api-method > .menu__link,
.schema > .menu__link {
    align-items: center;
    justify-content: start;
}

.api-method > .menu__link::before,
.schema > .menu__link::before {
    width: 55px;
    height: 20px;
    font-size: 10px;
    line-height: 20px;
    text-transform: uppercase;
    font-weight: 600;
    vertical-align: middle;
    font-family: var(--ifm-font-family-monospace);
    border-radius: 0.25rem;
    border: 1px solid;
    border-inline-start-width: 5px;
    margin-right: 8px;
    padding: 3px 5px 3px 4px;
    text-align: center;
    flex-shrink: 0;
    position: relative;
    top: -1.5px;
}

.theme-api-markdown .openapi__method-endpoint .badge {
    border-inline-start-width: 5px;
    padding: 3px 5px 3px 4px;
    margin-right: 5px;
}

.get > .menu__link::before,
.theme-api-markdown .openapi__method-endpoint .badge--primary {
    background-color: var(--ifm-color-info-contrast-background);
    color: var(--ifm-color-info-contrast-foreground);
    border-color: var(--ifm-color-info-dark);
}

.get > .menu__link::before {
    content: 'get';
}

.post > .menu__link::before {
    content: 'post';
}

.post > .menu__link::before,
.theme-api-markdown .openapi__method-endpoint .badge--success {
    background-color: var(--ifm-color-success-contrast-background);
    color: var(--ifm-color-success-contrast-foreground);
    border-color: var(--ifm-color-success-dark);
}

.delete > .menu__link::before {
    content: 'del';
}

.delete > .menu__link::before,
.theme-api-markdown .openapi__method-endpoint .badge--danger {
    background-color: var(--ifm-color-danger-contrast-background);
    color: var(--ifm-color-danger-contrast-foreground);
    border-color: var(--ifm-color-danger-dark);
}

.put > .menu__link::before {
    content: 'put';
}

.put > .menu__link::before,
.theme-api-markdown .openapi__method-endpoint .badge--info {
    background-color: var(--ifm-color-warning-contrast-background);
    color: var(--ifm-color-warning-contrast-foreground);
    border-color: var(--ifm-color-warning-dark);
}

.patch > .menu__link::before {
    content: 'patch';
}

.patch > .menu__link::before,
.theme-api-markdown .openapi__method-endpoint .badge--warning {
    background-color: var(--ifm-color-success-contrast-background);
    color: var(--ifm-color-success-contrast-foreground);
    border-color: var(--ifm-color-success-dark);
}

.head > .menu__link::before {
    content: 'head';
}

.head > .menu__link::before,
.event > .menu__link::before,
.schema > .menu__link::before,
.theme-api-markdown .openapi__method-endpoint .badge--secondary {
    background-color: var(--ifm-color-secondary-contrast-background);
    color: var(--ifm-color-secondary-contrast-foreground);
    border-color: var(--ifm-color-secondary-dark);
}

.event > .menu__link::before {
    content: 'event';
}

.event > .menu__link::before,
.theme-api-markdown .openapi__method-endpoint .badge--secondary {
    background-color: var(--ifm-color-secondary-contrast-background);
    color: var(--ifm-color-secondary-contrast-foreground);
    border-color: var(--ifm-color-secondary-dark);
}

.theme-doc-markdown .openapi__heading {
    font-size: var(--ifm-h1-font-size);
    margin-bottom: calc(var(--ifm-h1-vertical-rhythm-bottom)* var(--ifm-leading)) !important;
}

.theme-doc-markdown .openapi-tabs__code-container .openapi-tabs__code-item span {
    text-transform: none;
}

@media (max-width: 996px) {
    div[class^="navbarSearchContainer"] {
        position: static;
    }

    div[class^="navbarSearchContainer"] button {
        margin-left: 5px;
    }
}

@media (max-width: 768px) {
    .DocSearch-Button-Keys,
    .DocSearch-Button-Placeholder {
        display: none !important;
    }
}


================================================
File: /apify-docs-theme/src/theme/RunnableCodeBlock/RunnableCodeBlock.jsx
================================================
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';
import styles from './RunnableCodeBlock.module.css';

const EXAMPLE_RUNNERS = {
    playwright: '6i5QsHBMtm3hKph70',
    puppeteer: '7tWSD8hrYzuc9Lte7',
    cheerio: 'kk67IcZkKSSBTslXI',
};

const RunnableCodeBlock = ({ children, actor, hash, type, ...props }) => {
    hash = hash ?? children.hash;

    if (!children.code) {
        throw new Error(`RunnableCodeBlock requires "code" and "hash" props
Make sure you are importing the code block contents with the roa-loader.`);
    }

    if (!hash) {
        return (
            <CodeBlock {...props}>
                { children.code }
            </CodeBlock>
        );
    }

    const href = `https://console.apify.com/actors/${actor ?? EXAMPLE_RUNNERS[type ?? 'playwright']}?runConfig=${hash}&asrc=run_on_apify`;

    return (
        <div className={clsx(styles.container, 'runnable-code-block')}>
            <Link href={href} className={styles.button} rel="follow">
                Run on
                <svg width="91" height="25" viewBox="0 0 91 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="apify-logo-light alignMiddle_src-theme-Footer-index-module"><path d="M3.135 2.85A3.409 3.409 0 0 0 .227 6.699l2.016 14.398 8.483-19.304-7.59 1.059Z" fill="#97D700"></path><path d="M23.604 14.847 22.811 3.78a3.414 3.414 0 0 0-3.64-3.154c-.077 0-.153.014-.228.025l-3.274.452 7.192 16.124c.54-.67.805-1.52.743-2.379Z" fill="#71C5E8"></path><path d="M5.336 24.595c.58.066 1.169-.02 1.706-.248l12.35-5.211L13.514 5.97 5.336 24.595Z" fill="#FF9013"></path><path d="M33.83 5.304h3.903l5.448 14.623h-3.494l-1.022-2.994h-5.877l-1.025 2.994h-3.384L33.83 5.304Zm-.177 9.032h4.14l-2-5.994h-.086l-2.054 5.994ZM58.842 5.304h3.302v14.623h-3.302V5.304ZM64.634 5.304h10.71v2.7h-7.4v4.101h5.962v2.632h-5.963v5.186h-3.309V5.303ZM82.116 14.38l-5.498-9.076h3.748l3.428 6.016h.085l3.599-6.016H91l-5.56 9.054v5.569h-3.324v-5.548ZM51.75 5.304h-7.292v14.623h3.3v-4.634h3.993a4.995 4.995 0 1 0 0-9.99Zm-.364 7.417h-3.628V7.875h3.627a2.423 2.423 0 0 1 0 4.846Z" className="apify-logo" fill="#000"></path></svg>
            </Link>
            <CodeBlock {...props} className={clsx(styles.codeBlock, 'code-block', props.title != null ? 'has-title' : 'no-title')}>
                { children.code }
            </CodeBlock>
        </div>
    );
};

export default RunnableCodeBlock;


================================================
File: /apify-docs-theme/src/theme/RunnableCodeBlock/RunnableCodeBlock.module.css
================================================
.button {
    display: inline-block;
    padding: 3px 10px;
    position: absolute;
    top: 9px;
    right: 9px;
    z-index: 1;
    font-size: 16px;
    line-height: 28px;
    background: var(--prism-background-color);
    color: var(--prism-color);
    border: 1px solid var(--ifm-color-emphasis-300);
    border-radius: var(--ifm-global-radius);
    opacity: 0.7;
    font-weight: 600;
    width: 155px;
}

.button svg {
    height: 20px;
    position: absolute;
    top: 7.5px;
    right: 0;
}

.button:hover {
    opacity: 1;
    color: var(--prism-color);
}

.container {
    position: relative;
}


================================================
File: /apify-docs-theme/src/theme/Navbar/Content/index.jsx
================================================
import { useLocation } from '@docusaurus/router';
import { useThemeConfig, isRegexpStringMatch } from '@docusaurus/theme-common';
import {
    splitNavbarItems,
} from '@docusaurus/theme-common/internal';
import { usePluginData } from '@docusaurus/useGlobalData';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarSearch from '@theme/Navbar/Search';
import NavbarItem from '@theme/NavbarItem';
import React from 'react';

import styles from './styles.module.css';
import SearchBar from '../../SearchBar';

function NavbarItems({ items }) {
    return (
        <>
            {items.map((item, i) => <NavbarItem {...item} key={i} />)}
        </>
    );
}

function NavbarContentLayout({
    left,
    right,
}) {
    return (
        <div className="navbar__inner">
            <div className="navbar__container">
                <div className="navbar__items">{left}</div>
                <div className="navbar__items navbar__items--right">{right}</div>
            </div>
        </div>
    );
}

function SubNavbarTitle({ titleIcon, title }) {
    return titleIcon
        ? <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <img src={`img/${titleIcon}`} width={24} height={24} /> {title}
        </div>
        : title;
}

function SubNavbar() {
    const { options: { subNavbar } } = usePluginData('@apify/docs-theme');
    const location = useLocation();

    return (
        subNavbar && (!subNavbar?.pathRegex || isRegexpStringMatch(subNavbar.pathRegex, location.pathname)) ? (
            <div className="navbar__inner navbar__sub">
                <div className="navbar__container">
                    <div className="navbar__items">
                        <div className="navbar__sub--title">
                            <NavbarItem
                                label={<SubNavbarTitle title={subNavbar.title} titleIcon={subNavbar.titleIcon} />}
                                to={subNavbar.to ?? '/'}
                                activeBaseRegex='(?!)'
                            />
                        </div>
                        <NavbarItems items={subNavbar.items} />
                    </div>
                </div>
            </div>
        ) : null
    );
}

export default function NavbarContent() {
    const { navbar: { items } } = useThemeConfig();
    const [leftItems, rightItems] = splitNavbarItems(items);
    const searchBarItem = items.find((item) => item.type === 'search');
    return (
        <div
            style={{
                width: '100%',
                height: 'fit-content',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <NavbarContentLayout
                left={
                    <>
                        <NavbarMobileSidebarToggle />
                        <NavbarLogo />
                        <NavbarItems items={leftItems} />
                    </>
                }
                right={
                    <>
                        <NavbarColorModeToggle className={styles.colorModeToggle} />
                        <NavbarItems items={rightItems} />
                        {!searchBarItem && (
                            <NavbarSearch>
                                <SearchBar />
                            </NavbarSearch>
                        )}
                    </>
                }
            />
            <SubNavbar />
        </div>
    );
}


================================================
File: /apify-docs-theme/src/theme/Navbar/Content/styles.module.css
================================================
/*
Hide color mode toggle in small viewports
 */
@media (max-width: 996px) {
  .colorModeToggle {
    display: none;
  }
}


================================================
File: /apify-docs-theme/src/theme/Navbar/MobileSidebar/PrimaryMenu/index.jsx
================================================
import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import NavbarItem from '@theme/NavbarItem';

function useNavbarItems() {
    // TODO temporary casting until ThemeConfig type is improved
    return useThemeConfig().navbar.items;
}
// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu() {
    // const mobileSidebar = useNavbarMobileSidebar();
    // TODO how can the order be defined for mobile?
    // Should we allow providing a different list of items?
    const items = useNavbarItems();
    const baseUrl = useBaseUrl('/');
    const { options: { subNavbar } } = usePluginData('@apify/docs-theme');
    return (
        <>
            {
                subNavbar ? <>
                    <ul className="menu__list" style={{ marginBottom: '16px', borderBottom: '1px solid #e0e0e0', paddingBottom: '16px' }}>
                        <NavbarItem
                            key={'title'}
                            mobile
                            href={baseUrl}
                            label={subNavbar.title}
                        />
                        {subNavbar.items.map((item, i) => (
                            <NavbarItem
                                style={{ paddingLeft: '16px' }}
                                key={i}
                                mobile
                                {...item}
                            />
                        ))}
                    </ul>
                </> : null
            }
            <ul className="menu__list">
                <NavbarItem
                    key={'title2'}
                    mobile
                    label='Apify documentation'
                />
                {items.map((item, i) => (
                    <NavbarItem
                        mobile
                        style={{ paddingLeft: '16px' }}
                        {...item}
                        key={i}
                    />
                ))}
            </ul>
        </>
    );
}


================================================
File: /apify-docs-theme/src/theme/DocBreadcrumbs/Items/Home/index.js
================================================
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import IconHome from '@theme/Icon/Home';
import React from 'react';

import styles from './styles.module.css';

export default function HomeBreadcrumbItem() {
    const baseUrl = useBaseUrl('/');
    const currentPath = useLocation().pathname.replace(new RegExp(`^${baseUrl}`), '');
    const rootSection = useBaseUrl(currentPath.split('/')[0]);
    const homeHref = baseUrl === '/' ? rootSection : baseUrl;

    return (
        <li className="breadcrumbs__item">
            <Link
                aria-label={translate({
                    id: 'theme.docs.breadcrumbs.home',
                    message: 'Home page',
                    description: 'The ARIA label for the home page in the breadcrumbs',
                })}
                className="breadcrumbs__link"
                href={homeHref}>
                <IconHome className={styles.breadcrumbHomeIcon} />
            </Link>
        </li>
    );
}


================================================
File: /apify-docs-theme/src/theme/DocBreadcrumbs/Items/Home/styles.module.css
================================================
.breadcrumbHomeIcon {
    position: relative;
    top: 1px;
    vertical-align: top;
    height: 1.9rem;
    width: 1.9rem;
}


================================================
File: /apify-docs-theme/src/theme/DocBreadcrumbs/index.js
================================================
import Link from '@docusaurus/Link';
import {
    useSidebarBreadcrumbs,
} from '@docusaurus/plugin-content-docs/client';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useHomePageRoute } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

// TODO move to design system folder
function BreadcrumbsItemLink({ children, href, isLast }) {
    const className = 'breadcrumbs__link';
    if (isLast) {
        return (
            <span className={className} itemProp="name">
                {children}
            </span>
        );
    }
    return href ? (
        <Link className={className} href={href} itemProp="item">
            <span itemProp="name">{children}</span>
        </Link>
    ) : (
        // TODO Google search console doesn't like breadcrumb items without href.
        // The schema doesn't seem to require `id` for each `item`, although Google
        // insist to infer one, even if it's invalid. Removing `itemProp="item
        // name"` for now, since I don't know how to properly fix it.
        // See https://github.com/facebook/docusaurus/issues/7241
        <span className={className}>{children}</span>
    );
}

// TODO move to design system folder
function BreadcrumbsItem({ children, active, index, addMicrodata }) {
    return (
        <li
            {...(addMicrodata && {
                itemScope: true,
                itemProp: 'itemListElement',
                itemType: 'https://schema.org/ListItem',
            })}
            className={clsx('breadcrumbs__item', {
                'breadcrumbs__item--active': active,
            })}>
            {children}
            <meta itemProp="position" content={String(index + 1)}/>
        </li>
    );
}

export default function DocBreadcrumbs() {
    const breadcrumbs = useSidebarBreadcrumbs()?.slice(0, -1);
    const homePageRoute = useHomePageRoute();
    if (!breadcrumbs || breadcrumbs.length === 0) {
        return null;
    }
    return (
        <nav
            className={clsx(
                ThemeClassNames.docs.docBreadcrumbs,
                styles.breadcrumbsContainer,
            )}
            aria-label={translate({
                id: 'theme.docs.breadcrumbs.navAriaLabel',
                message: 'Breadcrumbs',
                description: 'The ARIA label for the breadcrumbs',
            })}>
            <ul
                className="breadcrumbs"
                itemScope
                itemType="https://schema.org/BreadcrumbList">
                {homePageRoute && <HomeBreadcrumbItem/>}
                {breadcrumbs.map((item, idx) => {
                    // const isLast = idx === breadcrumbs.length - 1;
                    const isLast = false;
                    return (
                        <BreadcrumbsItem
                            key={idx}
                            active={isLast}
                            index={idx}
                            addMicrodata={!!item.href}>
                            <BreadcrumbsItemLink href={item.href} isLast={isLast}>
                                {item.label}
                            </BreadcrumbsItemLink>
                        </BreadcrumbsItem>
                    );
                })}
            </ul>
        </nav>
    );
}


================================================
File: /apify-docs-theme/src/theme/DocBreadcrumbs/styles.module.css
================================================
.breadcrumbsContainer {
    --ifm-breadcrumb-size-multiplier: 1.28;
    margin-bottom: 1.2rem;
}


================================================
File: /apify-docs-theme/src/theme/ColorModeToggle/index.jsx
================================================
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { translate } from '@docusaurus/Translate';
import IconLightMode from '../Icon/LightMode';
import IconDarkMode from '../Icon/DarkMode';
import styles from './styles.module.css';

function ColorModeToggle({
    className,
    value,
    onChange,
}) {
    const isBrowser = useIsBrowser();
    const title = translate(
        {
            message: 'Switch between dark and light mode (currently {mode})',
            id: 'theme.colorToggle.ariaLabel',
            description: 'The ARIA label for the navbar color mode toggle',
        },
        {
            mode:
                value === 'dark'
                    ? translate({
                        message: 'dark mode',
                        id: 'theme.colorToggle.ariaLabel.mode.dark',
                        description: 'The name for the dark color mode',
                    })
                    : translate({
                        message: 'light mode',
                        id: 'theme.colorToggle.ariaLabel.mode.light',
                        description: 'The name for the light color mode',
                    }),
        },
    );
    return (
        <div className={clsx(styles.toggle, className)}>
            <button
                className={clsx(
                    'clean-btn',
                    styles.toggleButton,
                    !isBrowser && styles.toggleButtonDisabled,
                )}
                type="button"
                onClick={() => onChange(value === 'dark' ? 'light' : 'dark')}
                disabled={!isBrowser}
                title={title}
                aria-label={title}>
                <span>
                    <IconLightMode
                        className={clsx(styles.toggleIcon, styles.lightToggleIcon)}
                        width={14} height={14}
                    />
                    <IconDarkMode
                        className={clsx(styles.toggleIcon, styles.darkToggleIcon)}
                        width={14} height={14}
                    />
                </span>
            </button>
        </div>
    );
}

export default React.memo(ColorModeToggle);


================================================
File: /apify-docs-theme/src/theme/ColorModeToggle/styles.module.css
================================================
.toggle {
    padding: 3px;
}

.toggleButton {
    width: 52px;
    height: 26px;
    background: #cfd4eb;
    border-radius: 160px;
    display: flex;
    align-items: center;
    transition: all var(--ifm-transition-fast);
}

[data-theme='dark'] .toggleButton {
    background: #585e76;
}

.toggleButton span {
    -webkit-tap-highlight-color: transparent;
    align-items: center;
    display: flex;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    vertical-align: middle;
    margin: 3px;
    position: relative;
    transition: all var(--ifm-transition-fast);
    left: 0;
    color: #585e76;
}

[data-theme='dark'] .toggleButton span {
    background: #1a1b23;
    color: #b3b8d2;
    left: 25px;
}

.toggleButton:hover span {
    background: var(--ifm-color-emphasis-200);
}

[data-theme='light'] .darkToggleIcon,
[data-theme='dark'] .lightToggleIcon {
    display: none;
}

.toggleButtonDisabled {
    cursor: not-allowed;
}


================================================
File: /apify-docs-theme/src/theme/Logo/index.js
================================================
import Link from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ThemedImage from '@theme/ThemedImage';
import React from 'react';

function LogoThemedImage({ logo, alt, imageClassName }) {
    const sources = {
        light: useBaseUrl(logo.src),
        dark: useBaseUrl(logo.srcDark || logo.src),
    };
    const themedImage = (
        <ThemedImage
            className={logo.className}
            sources={sources}
            height={logo.height}
            width={logo.width}
            alt={alt}
            style={logo.style}
        />
    );
    // Is this extra div really necessary?
    // introduced in https://github.com/facebook/docusaurus/pull/5666
    return imageClassName ? (
        <div className={imageClassName}>{themedImage}</div>
    ) : (
        themedImage
    );
}
export default function Logo(props) {
    const {
        siteConfig: { title },
    } = useDocusaurusContext();
    const {
        navbar: { title: navbarTitle, logo },
    } = useThemeConfig();
    const { imageClassName, titleClassName, ...propsRest } = props;
    const logoLink = useBaseUrl(logo?.href || '/');
    // If visible title is shown, fallback alt text should be
    // an empty string to mark the logo as decorative.
    const fallbackAlt = navbarTitle ? '' : title;
    // Use logo alt text if provided (including empty string),
    // and provide a sensible fallback otherwise.
    const alt = logo?.alt ?? fallbackAlt;
    return (
        <Link
            to={logoLink}
            {...propsRest}
            {...(logo?.target && { target: logo.target })}>
            {logo && (
                <LogoThemedImage
                    logo={logo}
                    alt={alt}
                    imageClassName={imageClassName}
                />
            )}
            {!logo ? <b className={titleClassName}>{navbarTitle}</b> : null}
        </Link>
    );
}


================================================
File: /apify-docs-theme/src/theme/Layout/index.jsx
================================================
import React from 'react';
// cannot use any of the theme aliases here as it causes a circular dependency :( ideas welcome
import Layout from '@docusaurus/theme-classic/lib/theme/Layout/index';
import { usePluginData } from '@docusaurus/useGlobalData';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLocation } from '@docusaurus/router';

export default function LayoutWrapper(props) {
    const { options: { subNavbar } } = usePluginData('@apify/docs-theme');
    const baseUrl = useBaseUrl('/');
    const currentPath = useLocation().pathname.replace(new RegExp(`^${baseUrl}`), '');

    return (
        <div style={{
            '--ifm-navbar-height': subNavbar && !currentPath.startsWith('api/v2') ? '123px' : '68px',
            'margin': 0,
            'padding': 0,
            'boxSizing': 'border-box',
        }}>
            <Layout {...props} />
        </div>
    );
}


================================================
File: /apify-docs-theme/src/theme/Footer/index.jsx
================================================
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import LinkItem from '@theme/Footer/LinkItem';
import styles from './index.module.css';

function FooterLinksColumn({ column }) {
    return (
        <>
            <div className={styles.footerTitle}>{column.title}</div>
            <ul className={clsx(styles.footerItem, 'clean-list')}>
                {column.items.map((item, i) => (
                    <li key={i} className="footer__item">
                        <LinkItem item={item} />
                    </li>
                ))}
            </ul>
        </>
    );
}

function Footer() {
    const { footer } = useThemeConfig();
    if (!footer) {
        return null;
    }
    const { links, style } = footer;
    return (
        <footer className={clsx(styles.footer, style)}>
            <div className="container padding-horiz--lg">
                <div className="row" style={{ justifyContent: 'space-between' }}>
                    { links.map((column, i) => (
                        <div key={i} className={`col col--2`}>
                            <FooterLinksColumn {...{ column }} />
                        </div>
                    ))
                    }
                </div>
                <div className="row padding-vert--md padding-top--lg">
                    <div className="col padding-vert--md col--6">
                        <a href="https://apify.com" target={'_blank'} rel={'dofollow noreferrer'}>
                            <span className={styles.footerLogo}></span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default React.memo(Footer);


================================================
File: /apify-docs-theme/src/theme/Footer/index.module.css
================================================
.footer {
    padding-top: 64px;
}

.builtBy {
    color: #b3b8d2;
}

.builtBy svg {
    margin-left: 10px;
    width: 90px;
    height: 24px;
}

.freeAndOpenSource {
    color: #b3b8d2;
}

.alignMiddle {
    vertical-align: middle;
    display: inline-block;
}

.freeAndOpenSource svg {
    margin-right: 10px;
}

.freeAndOpenSource svg path {
    fill: #b3b8d2 !important;
}

.footer .footer__item svg path {
    fill: #6f7490;
}

.footerTitle {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
        'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #8d92af;
    margin-bottom: 20px;
}

.footerLogo {
    display: inline-block;
    width: 90px;
    height: 24px;
    background-image: url('/img/footer-apify-logo-black.svg');
    background-repeat: no-repeat;
}

html[data-theme='dark'] .footerLogo {
    background-image: url('/img/footer-apify-logo-white.svg');
}

/** dummy comment just to trigger theme publishing 3 */


================================================
File: /apify-docs-theme/src/theme/Footer/LinkItem/index.js
================================================
import isInternalUrl_ from '@docusaurus/isInternalUrl';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import IconExternalLink from '@theme/Icon/ExternalLink';
import React from 'react';

export default function FooterLinkItem({ item }) {
    const {
        to,
        href,
        label,
        prependBaseUrlToHref,
        ...props
    } = item;
    const toUrl = useBaseUrl(to);
    const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
    const { siteConfig } = useDocusaurusContext();
    const isInternalUrl = (url) => {
        if (url.startsWith(siteConfig.url)) {
            return true;
        }
        return isInternalUrl_(url);
    };
    return (
        <Link
            className="footer__link-item"
            {...(href
                ? {
                    href: prependBaseUrlToHref ? normalizedHref : href,
                }
                : {
                    to: toUrl,
                })}
            {...props}>
            {label}
            {href && !isInternalUrl(href) && <IconExternalLink />}
        </Link>
    );
}


================================================
File: /apify-docs-theme/src/theme/CodeThemes/light.js
================================================
export const lightTheme = {
    plain: {
        color: 'black',
        backgroundColor: '#f8f9fc',
    },
    styles: [
        {
            types: ['prolog', 'doctype', 'cdata'],
            style: {
                color: 'slategray',
            },
        },
        {
            types: ['punctuation'],
            style: {
                color: '#999',
            },
        },
        {
            types: ['namespace'],
            style: {
                opacity: 0.7,
            },
        },
        {
            types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol', 'deleted'],
            style: {
                color: '#905',
            },
        },
        {
            types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
            style: {
                color: '#690',
            },
        },
        {
            types: ['operator', 'entity', 'url'],
            style: {
                color: '#9a6e3a',
                backgroundColor: 'hsla(0, 0%, 100%, 0.5)',
            },
        },
        {
            types: ['atrule', 'attr-value', 'keyword'],
            style: {
                color: '#07a',
            },
        },
        {
            types: ['function', 'class-name'],
            style: {
                color: '#DD4A68',
            },
        },
        {
            types: ['comment'],
            style: {
                color: 'slategray',
                fontStyle: 'italic',
            },
        },
        {
            types: ['regex'],
            style: {
                color: '#e90',
            },
        },
        {
            types: ['important'],
            style: {
                color: '#e90',
                fontWeight: 'bold',
            },
        },
        {
            types: ['variable'],
            style: {
                color: '#e90',
            },
        },
        {
            types: ['bold'],
            style: {
                fontWeight: 'bold',
            },
        },
        {
            types: ['italic'],
            style: {
                fontStyle: 'italic',
            },
        },
    ],
};


================================================
File: /apify-docs-theme/src/theme/CodeThemes/dark.js
================================================
// Original: https://github.com/sdras/night-owl-vscode-theme

export const darkTheme = {
    plain: {
        color: '#d6deeb',
        backgroundColor: '#252832',
    },
    styles: [
        {
            types: ['changed'],
            style: {
                color: 'rgb(162, 191, 252)',
                fontStyle: 'italic',
            },
        },
        {
            types: ['deleted'],
            style: {
                color: 'rgba(239, 83, 80, 0.56)',
                fontStyle: 'italic',
            },
        },
        {
            types: ['inserted', 'attr-name'],
            style: {
                color: 'rgb(173, 219, 103)',
                fontStyle: 'italic',
            },
        },
        {
            types: ['comment'],
            style: {
                color: 'rgb(99, 119, 119)',
                fontStyle: 'italic',
            },
        },
        {
            types: ['string', 'url'],
            style: {
                color: 'rgb(173, 219, 103)',
            },
        },
        {
            types: ['variable'],
            style: {
                color: 'rgb(214, 222, 235)',
            },
        },
        {
            types: ['number'],
            style: {
                color: 'rgb(247, 140, 108)',
            },
        },
        {
            types: ['builtin', 'char', 'constant', 'function'],
            style: {
                color: 'rgb(130, 170, 255)',
            },
        },
        {
            types: ['punctuation'],
            style: {
                color: 'rgb(199, 146, 234)',
            },
        },
        {
            types: ['selector', 'doctype'],
            style: {
                color: 'rgb(199, 146, 234)',
                fontStyle: 'italic',
            },
        },
        {
            types: ['class-name'],
            style: {
                color: 'rgb(255, 203, 139)',
            },
        },
        {
            types: ['tag', 'operator', 'keyword'],
            style: {
                color: 'rgb(127, 219, 202)',
            },
        },
        {
            types: ['boolean'],
            style: {
                color: 'rgb(255, 88, 116)',
            },
        },
        {
            types: ['property'],
            style: {
                color: 'rgb(128, 203, 196)',
            },
        },
        {
            types: ['namespace'],
            style: {
                color: 'rgb(178, 204, 214)',
            },
        },
    ],
};


================================================
File: /apify-docs-theme/src/index.js
================================================
const config = require('./config.js');
const { theme } = require('./theme.js');

module.exports = {
    default: theme,
    config,
};


================================================
File: /apify-docs-theme/src/config.js
================================================
/* eslint-disable global-require */
// eslint-disable-next-line no-nested-ternary
const absoluteUrl = process.env.LOCALHOST
    ? 'http://localhost:3000'
    : process.env.DEV
        ? 'http://docs.apify.loc'
        : 'https://docs.apify.com';

const themeConfig = ({
    docs: {
        versionPersistence: 'localStorage',
        sidebar: {
            hideable: true,
        },
    },
    navbar: {
        title: 'Apify Docs',
        logo: {
            src: 'img/apify_sdk.svg',
            srcDark: 'img/apify_sdk_white.svg',
            href: absoluteUrl,
            target: '_self',
        },
        items: [
            {
                label: 'Academy',
                href: `${absoluteUrl}/academy`,
                activeBasePath: 'academy',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'Platform',
                href: `${absoluteUrl}/platform`,
                className: 'navbar__active',
                activeBasePath: 'platform',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'API',
                type: 'dropdown',
                to: `${absoluteUrl}/api`,
                target: '_self',
                rel: 'dofollow',
                activeBasePath: 'api',
                position: 'left',
                items: [
                    {
                        label: 'Reference',
                        href: `${absoluteUrl}/api/v2`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Client for JavaScript',
                        href: `${absoluteUrl}/api/client/js/`, // we need a trailing slash here, we'd get redirected there anyway
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Client for Python',
                        href: `${absoluteUrl}/api/client/python/`, // we need a trailing slash here, we'd get redirected there anyway
                        target: '_self',
                        rel: 'dofollow',
                    },
                ],
            },
            {
                label: 'SDK',
                type: 'dropdown',
                to: `${absoluteUrl}/sdk`,
                activeBasePath: 'sdk',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
                items: [
                    {
                        label: 'SDK for JavaScript',
                        href: `${absoluteUrl}/sdk/js/`, // we need a trailing slash here, we'd get redirected there anyway
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        html: 'SDK for Python',
                        href: `${absoluteUrl}/sdk/python/`, // we need a trailing slash here, we'd get redirected there anyway
                        target: '_self',
                        rel: 'dofollow',
                    },
                ],
            },
            {
                label: 'CLI',
                href: `${absoluteUrl}/cli/`, // we need a trailing slash here, we'd get redirected there anyway
                position: 'left',
                activeBasePath: 'cli',
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'Open source',
                type: 'dropdown',
                to: `${absoluteUrl}/open-source`,
                activeBasePath: 'open-source',
                target: '_self',
                position: 'left',
                className: 'navbar__item',
                items: [
                    {
                        label: 'Crawlee',
                        href: 'https://crawlee.dev',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Got Scraping',
                        href: 'https://github.com/apify/got-scraping',
                    },
                    {
                        label: 'Fingerprint Suite',
                        href: 'https://github.com/apify/fingerprint-suite',
                    },
                    {
                        label: 'Apify on GitHub',
                        href: 'https://github.com/apify',
                    },
                ],
            },
            {
                href: 'https://github.com/apify',
                label: 'GitHub',
                title: 'Apify on GitHub',
                position: 'right',
                className: 'icon',
            },
            {
                href: 'https://discord.com/invite/jyEM2PRvMU',
                label: 'Discord',
                title: 'Chat on Discord',
                position: 'right',
                className: 'icon',
            },
        ],
    },
    colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
    },
    prism: {
        defaultLanguage: 'typescript',
        theme: require('./theme/CodeThemes/light').lightTheme,
        darkTheme: require('./theme/CodeThemes/dark').darkTheme,
        additionalLanguages: ['docker', 'log', 'php', 'json5', 'bash'],
    },
    // this needs to be absolute link otherwise it gets resolved wrongly in project docs
    image: 'https://apify.com/og-image/docs-article',
    footer: {
        links: [
            {
                title: 'Learn',
                items: [
                    {
                        label: 'Academy',
                        href: `${absoluteUrl}/academy`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Platform',
                        href: `${absoluteUrl}/platform`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                ],
            },
            {
                title: 'API',
                items: [
                    {
                        label: 'Reference',
                        href: `${absoluteUrl}/api/v2`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Client for JavaScript',
                        href: `${absoluteUrl}/api/client/js/`, // we need a trailing slash here, we'd get redirected there anyway
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Client for Python',
                        href: `${absoluteUrl}/api/client/python/`, // we need a trailing slash here, we'd get redirected there anyway
                        target: '_self',
                        rel: 'dofollow',
                    },
                ],
            },
            {
                title: 'SDK',
                items: [
                    {
                        label: 'SDK for JavaScript',
                        href: `${absoluteUrl}/sdk/js/`, // we need a trailing slash here, we'd get redirected there anyway
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'SDK for Python',
                        href: `${absoluteUrl}/sdk/python/`, // we need a trailing slash here, we'd get redirected there anyway
                        target: '_self',
                        rel: 'dofollow',
                    },
                ],
            },
            {
                title: 'Other',
                items: [
                    {
                        label: 'CLI',
                        href: `${absoluteUrl}/cli/`, // we need a trailing slash here, we'd get redirected there anyway
                        position: 'left',
                        target: '_self',
                        rel: 'dofollow',
                    },
                ],
            },
            {
                title: 'More',
                items: [
                    {
                        label: 'Crawlee',
                        to: 'https://crawlee.dev',
                        rel: 'dofollow',
                    },
                    {
                        label: 'GitHub',
                        href: 'https://github.com/apify',
                    },
                ],
            },
        ],
        logo: {
            src: 'img/apify_logo.svg',
            href: '/',
            width: '60px',
            height: '60px',
        },
    },
    algolia: {
        appId: 'N8EOCSBQGH',
        apiKey: 'e97714a64e2b4b8b8fe0b01cd8592870', // search only (public) API key
        indexName: 'test_test_apify_sdk',
        algoliaOptions: {
            facetFilters: ['version:VERSION'],
        },
    },
    hubspot: {
        accountId: '19497222',
        async: true,
        defer: true,
    },
});

const plugins = [
    [
        'docusaurus-gtm-plugin',
        {
            id: 'GTM-MNGXGGB',
        },
    ],
    '@stackql/docusaurus-plugin-hubspot',
    async function runnableCodeBlock() {
        return {
            name: 'runnable-code-block',
            configureWebpack() {
                return {
                    resolveLoader: {
                        alias: {
                            'roa-loader': require.resolve(`${__dirname}/roa-loader/`),
                        },
                    },
                };
            },
        };
    },
];

module.exports = {
    themeConfig,
    plugins,
    absoluteUrl,
};


================================================
File: /apify-docs-theme/static/js/custom.js
================================================
// function load() {
//     const versions = document.querySelectorAll('.navbar .dropdown ul a');
//     const basePath = '';
//     const types = [`${basePath}/docs/next`, `${basePath}/docs`];
//     let i = 0;
//
//     for (const el of versions) {
//         const match = el.href.match(/\/docs\/(\d+\.\d+(\.\d+)?)$/) || el.href.match(/\/docs\/(\d+\.\d+(\.\d+)?)/);
//
//         if (!types[i++] && !match) {
//             continue;
//         }
//
//         const version = (types[i++] || match[0]).replace('/docs', '/api');
//
//         if (el.classList.contains('api-version-bound')) {
//             continue;
//         }
//
//         el.addEventListener('click', (e) => {
//             if (version && window.location.pathname.startsWith(`${basePath}/api`)) {
//                 window.location.href = version;
//                 e.preventDefault();
//             }
//         });
//         el.classList.add('api-version-bound');
//     }
// }
//
// setInterval(() => {
//     if (document.querySelectorAll('.navbar .dropdown ul a').length > 0) {
//         load();
//     }
// }, 500);

let lastKnownScrollHash = '';

// handles automatic scrolling of the API reference sidebar (redoc)
function scrollSidebarItemIntoView() {
    const hash = window.location.hash.substring(1);

    if (hash !== lastKnownScrollHash) {
        const $li = document.querySelector(`li[data-item-id="${hash}"]`);

        if (!$li) {
            return;
        }

        // not visible, click on the parent <li> first
        if (!$li.offsetParent) {
            $li.parentElement?.parentElement?.click();
        }

        $li.scrollIntoView({
            // smooth would be nice, but it's not working in some case
            // behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        });
        lastKnownScrollHash = hash;
    }
}

// handles automatic scrolling of the API reference sidebar (openapi-docs)
function scrollOpenApiSidebarItemIntoView() {
    const $li = document.querySelector(`li > a.menu__link--active[href]`);

    if (!$li) {
        return;
    }

    $li.scrollIntoView({
        block: 'nearest',
        inline: 'center',
    });
}

function redirectOpenApiDocs() {
    const { hash, pathname } = new URL(window.location.href);

    // TODO change to '/api/v2'
    if (pathname.replace(/\/$/, '') !== '/api/v2-new') {
        return;
    }

    if (hash.startsWith('#/reference/')) {
        const sidebarItems = document.querySelectorAll('[data-altids]');

        for (const item of sidebarItems) {
            const ids = item.getAttribute('data-altids').split(',');
            if (ids.find((variant) => variant === hash)) {
                item.click();
            }
        }
    }

    if (hash.startsWith('#tag/')) {
        const id = hash.substring('#tag/'.length);
        console.log('redirect', { id, hash });
    }
}

let ticking = false;

document.addEventListener('scroll', () => {
    if (!ticking) {
        // throttling based on current frame rate
        window.requestAnimationFrame(() => {
            scrollSidebarItemIntoView();
            ticking = false;
        });

        ticking = true;
    }
});

window.addEventListener('load', () => {
    setTimeout(() => redirectOpenApiDocs(), 500);

    // we need to wait a bit more, since the event fires too soon, and a lot of hydration is done after it
    setTimeout(() => scrollSidebarItemIntoView(), 1000);

    // docusaurus-openapi-docs plugin: scroll sidebar into viewport, no need for a large timeout here
    setTimeout(() => scrollOpenApiSidebarItemIntoView(), 100);
});

window.addEventListener('popstate', () => {
    setTimeout(() => scrollOpenApiSidebarItemIntoView(), 50);
});


================================================
File: /.markdownlintignore
================================================
node_modules
build


================================================
File: /.npmrc
================================================
@apify-packages:registry=https://npm.pkg.github.com
legacy-peer-deps=true


================================================
File: /.github/workflows/typos-check.yaml
================================================
name: Typos Check

on:
    pull_request:
        branches: [ master ]

jobs:
    run:
        name: Spell Check with Typos
        runs-on: ubuntu-latest
        steps:
            -   name: Checkout code
                uses: actions/checkout@v4

            -   name: Check spelling
                uses: crate-ci/typos@master
                with:
                    files: ./sources


================================================
File: /.github/workflows/openapi.yaml
================================================
name: Check OpenAPI specs

on:
    push:

#env:
#    APIFY_STAGING_TOKEN: ${{ secrets.APIFY_STAGING_TOKEN }}

jobs:
    build:
        name: Build the specification file
        runs-on: ubuntu-latest

        steps:
            -   uses: actions/checkout@v4

            -   name: Use Node.js 22
                uses: actions/setup-node@v4
                with:
                    node-version: 22
                    cache: 'npm'
                    cache-dependency-path: 'package-lock.json'
                    registry-url: 'https://npm.pkg.github.com/'
                    scope: '@apify-packages'

            -   name: Enable corepack
                run: |
                    corepack enable

            -   name: Install Dependencies
                run: npm ci --force
                env:
                    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

            -   run: |
                    npm ci
                    npm run redoc:test

# TODO
#            -   uses: actions/setup-python@v5
#                with:
#                    python-version: '3.10'
#            -   run: python -m pip install schemathesis==3.35.0


================================================
File: /.github/workflows/docs.yaml
================================================
name: docs

on:
    push:
        branches:
            - master
    workflow_dispatch:

jobs:
    build:
        environment:
            name: github-pages
        permissions:
            contents: write
            pages: write
            id-token: write
        runs-on: ubuntu-latest

        steps:
            -   uses: actions/checkout@v4
            -   name: Use Node.js 22
                uses: actions/setup-node@v4
                with:
                    node-version: 22
                    cache: 'npm'
                    cache-dependency-path: 'package-lock.json'
                    always-auth: 'true'
                    registry-url: 'https://npm.pkg.github.com/'
                    scope: '@apify-packages'

            -   name: Enable corepack
                run: |
                    corepack enable

            -   name: Build docs
                run: |
                    npm ci --force
                    npm run build
                env:
                    APIFY_SIGNING_TOKEN: ${{ secrets.APIFY_SIGNING_TOKEN }}
                    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
                    INTERCOM_APP_ID: ${{ secrets.INTERCOM_APP_ID }}

            -   name: Set up GitHub Pages
                uses: actions/configure-pages@v5

            -   name: Upload GitHub Pages artifact
                uses: actions/upload-pages-artifact@v3
                with:
                    path: ./build

            -   name: Deploy artifact to GitHub Pages
                uses: actions/deploy-pages@v4

            -   name: Invalidate CloudFront cache
                run: gh workflow run invalidate.yaml --repo apify/apify-docs-private
                env:
                    GITHUB_TOKEN: ${{ secrets.APIFY_SERVICE_ACCOUNT_GITHUB_TOKEN }}


================================================
File: /.github/workflows/vale.yaml
================================================
name: Vale

on: [ pull_request ]

jobs:
    lint:
        runs-on: ubuntu-latest

        steps:
            -   uses: actions/checkout@v4
                with:
                    fetch-depth: 0

            -   name: Get changed files
                id: changed-files
                uses: tj-actions/changed-files@v45
                with:
                    files: '**/*.{md,mdx}'
                    files_ignore: |
                        sources/api/*.{md,mdx}
                        apify-api/README.md
                        apify-api/openapi/README.md
                        apify-api/openapi/paths/README.md
                        apify-api/openapi/components/README.md
                    separator: ','

            -   uses: errata-ai/vale-action@reviewdog
                if: steps.changed-files.outputs.any_changed == 'true'
                with:
                    files: ${{ steps.changed-files.outputs.all_changed_files }}
                    separator: ','
                    fail_on_error: true
                    vale_flags: '--minAlertLevel=error'
                    reporter: github-pr-annotations


================================================
File: /.github/workflows/deploy.yaml
================================================
name: 'Deploy'

on:
  push:
    paths:
    - 'nginx.conf'

jobs:
  deploy:
      name: 'Deploy NGINX'
      runs-on: ubuntu-latest
      steps:
        - run: gh workflow run deploy.yaml --repo apify/apify-docs-private
          env:
            GITHUB_TOKEN: ${{ secrets.APIFY_SERVICE_ACCOUNT_GITHUB_TOKEN }}
            INTERCOM_APP_ID: ${{ secrets.INTERCOM_APP_ID }}


================================================
File: /.github/workflows/test.yaml
================================================
name: Test

on:
    push:
        branches: [ master, renovate/** ]
    pull_request:

jobs:
    build:
        name: Docs build
        runs-on: ubuntu-latest
        steps:
            -   name: Checkout Source code
                uses: actions/checkout@v4

            -   name: Use Node.js 22
                uses: actions/setup-node@v4
                with:
                    node-version: 22
                    cache: 'npm'
                    cache-dependency-path: 'package-lock.json'
                    always-auth: 'true'
                    registry-url: 'https://npm.pkg.github.com/'
                    scope: '@apify-packages'

            -   name: Enable corepack
                run: |
                    corepack enable

            -   name: Install Dependencies
                run: npm ci --force
                env:
                    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

            -   run: npm run build
                env:
                    INTERCOM_APP_ID: ${{ secrets.INTERCOM_APP_ID }}

    lint_content:
        name: Lint markdown content
        runs-on: ubuntu-latest
        steps:
            -   name: Checkout Source code
                uses: actions/checkout@v4

            -   name: Get changed files
                id: changed-files
                uses: tj-actions/changed-files@v45
                with:
                    files: '**/*.{md,mdx}'
                    files_ignore: '!sources/api/*.{md,mdx}'
                    separator: ","

            -   name: Use Node.js 22
                uses: actions/setup-node@v4
                with:
                    node-version: 22
                    cache: 'npm'
                    cache-dependency-path: 'package-lock.json'
                    registry-url: 'https://npm.pkg.github.com/'
                    scope: '@apify-packages'

            -   name: Enable corepack
                run: |
                    corepack enable

            -   name: Install Dependencies
                run: npm ci --force
                env:
                    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

            -   name: List and Lint Changed Markdown Files
                env:
                    ALL_CHANGED_FILES: ${{ steps.changed-files.outputs.all_changed_files }}
                run: |
                    IFS=',' read -ra FILE_ARRAY <<< "$ALL_CHANGED_FILES"
                    for file in "${FILE_ARRAY[@]}"; do
                      npx markdownlint "$file"
                    done


    lint_code:
        name: Lint app code
        runs-on: ubuntu-latest
        steps:
            -   name: Checkout Source code
                uses: actions/checkout@v4

            -   name: Use Node.js 22
                uses: actions/setup-node@v4
                with:
                    node-version: 22
                    cache: 'npm'
                    cache-dependency-path: 'package-lock.json'
                    registry-url: 'https://npm.pkg.github.com/'
                    scope: '@apify-packages'

            -   name: Enable corepack
                run: |
                    corepack enable

            -   name: Install Dependencies
                run: npm ci --force
                env:
                    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

            -   run: npm run lint:code


================================================
File: /.github/workflows/publish-theme.yaml
================================================
name: publish-theme

on:
    push:
        branches:
            - master
    workflow_dispatch:

jobs:
    look_for_change:
        if: ${{ !contains(github.event.head_commit.message, '[skip ci]') }}
        runs-on: ubuntu-latest
        outputs:
            theme_changed: ${{ steps.changed-theme-files.outputs.any_changed }}
        steps:
            -   uses: actions/checkout@v4
                with:
                    fetch-depth: 0

            -   name: Use Node.js 22
                uses: actions/setup-node@v4
                with:
                    node-version: 22
                    cache: 'npm'
                    cache-dependency-path: 'package-lock.json'

            -   name: Enable corepack
                run: |
                    corepack enable

            -   name: Check changes in theme
                id: changed-theme-files
                uses: tj-actions/changed-files@v45
                with:
                    since_last_remote_commit: "true"
                    files: |
                        apify-docs-theme/**

    publish:
        needs: look_for_change
        if: ${{ needs.look_for_change.outputs.theme_changed == 'true' || github.event_name == 'workflow_dispatch' }}
        runs-on: ubuntu-latest
        steps:
            -   uses: actions/checkout@v4
                with:
                    token: ${{ secrets.APIFY_SERVICE_ACCOUNT_GITHUB_TOKEN }}

            -   name: Use Node.js 22
                uses: actions/setup-node@v4
                with:
                    node-version: 22
                    cache: 'npm'
                    cache-dependency-path: 'package-lock.json'
                    always-auth: 'true'

            -   name: Enable corepack
                run: |
                    corepack enable

            -   name: Setup git user and npm
                run: |
                    git config --global user.name "Apify Release Bot"
                    git config --global user.email "noreply@apify.com"

                    echo "access=public" > ~/.npmrc
                    echo "@apify-packages:registry=https://npm.pkg.github.com/" >> ~/.npmrc
                    echo "//registry.npmjs.org/:_authToken=${{ secrets.APIFY_SERVICE_ACCOUNT_NPM_TOKEN }}" >> ~/.npmrc
                    echo "//npm.pkg.github.com/:_authToken=${{ secrets.APIFY_SERVICE_ACCOUNT_GITHUB_TOKEN }}" >> ~/.npmrc

            -   name: Bump the theme version
                run: |
                    cd $GITHUB_WORKSPACE/apify-docs-theme
                    npm version patch --legacy-peer-deps

            -   name: Deploy theme to npm
                run: |
                    cd $GITHUB_WORKSPACE/apify-docs-theme
                    npx -y publish-if-not-exists
                env:
                    GIT_USER: "barjin:${{ secrets.APIFY_SERVICE_ACCOUNT_GITHUB_TOKEN }}"
                    GH_TOKEN: ${{ secrets.APIFY_SERVICE_ACCOUNT_GITHUB_TOKEN }}

            -   name: Wait until the new theme version is available on npm
                run: |
                    cd $GITHUB_WORKSPACE/apify-docs-theme
                    PACKAGE_JSON=$(cat package.json);
                    PACKAGE_NAME=$(jq -r .name <(echo $PACKAGE_JSON));
                    PACKAGE_VER=$(jq -r .version <(echo $PACKAGE_JSON));
                    for i in $(seq 1 10); do
                        EXIT_CODE=0;
                        npm show $PACKAGE_NAME@$PACKAGE_VER || EXIT_CODE=1;
                        if [[ $EXIT_CODE -eq 1 ]]; then
                            echo "The new package version ($PACKAGE_VER) is not yet available, waiting 30 seconds...";
                            sleep 30;
                            continue;
                        fi;
                        echo "The new package version ($PACKAGE_VER) is live, proceeding!";
                        break;
                    done;
                    npm show $PACKAGE_NAME@$PACKAGE_VER # fails if the package is not available, succeeds if it is

            -   name: Commit the new theme version
                uses: stefanzweifel/git-auto-commit-action@v5
                with:
                    commit_message: 'chore: publish new version of @apify/docs-theme [skip ci]'
                    file_pattern: 'apify-docs-theme/package*.json'
                    commit_user_name: Apify Bot
                    commit_user_email: my-github-actions-bot@example.org
                    commit_author: Apify Bot <apify@apify.com>

    rebuild-docs:
        needs: publish
        strategy:
            matrix:
                repo:
                    - apify/apify-sdk-js
                    - apify/apify-cli
                    - apify/apify-client-js

        runs-on: ubuntu-latest
        steps:
            -   env:
                    GITHUB_TOKEN: ${{ secrets.APIFY_SERVICE_ACCOUNT_GITHUB_TOKEN }}
                run: |
                    gh workflow run docs.yaml --repo ${{ matrix.repo }}

    rebuild-python-docs:
        needs: publish
        strategy:
            matrix:
                repo:
                    - apify/apify-sdk-python
                    - apify/apify-client-python

        runs-on: ubuntu-latest
        steps:
            -   env:
                    GITHUB_TOKEN: ${{ secrets.APIFY_SERVICE_ACCOUNT_GITHUB_TOKEN }}
                run: |
                    gh workflow run build_and_deploy_docs.yaml --repo ${{ matrix.repo }}


================================================
File: /.github/workflows/lychee.yml
================================================
name: Periodic Link Checker

on:
    schedule:
        -   cron: '0 0 * * *'  # Run daily at midnight UTC
    workflow_dispatch:  # Allow manual triggering

jobs:
    link-check:
        runs-on: ubuntu-latest
        steps:
            -   uses: actions/checkout@v4

            -   name: Use Node.js 22
                uses: actions/setup-node@v4
                with:
                    node-version: 22
                    cache: 'npm'
                    cache-dependency-path: 'package-lock.json'
                    always-auth: 'true'
                    registry-url: 'https://npm.pkg.github.com/'
                    scope: '@apify-packages'

            -   name: Enable corepack
                run: |
                    corepack enable

            -   name: Build docs
                run: |
                    npm ci --force
                    npm run build
                env:
                    APIFY_SIGNING_TOKEN: ${{ secrets.APIFY_SIGNING_TOKEN }}
                    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
                    INTERCOM_APP_ID: ${{ secrets.INTERCOM_APP_ID }}

            -   name: Run Lychee Link Checker
                id: lychee
                uses: lycheeverse/lychee-action@v2.1.0
                env:
                    GITHUB_TOKEN: ${{ secrets.APIFY_SERVICE_ACCOUNT_GITHUB_TOKEN }}
                with:
                    fail: true
                    args: >
                        --base https://docs.apify.com
                        --exclude-path 'build/versions.html'
                        --max-retries 6
                        --verbose
                        --no-progress
                        --include-fragments
                        --accept '100..=103,200..=299,403..=403,429'
                        --format markdown
                        './build/**/*.html'


================================================
File: /.github/workflows/check-pr-title.yaml
================================================
name: Check PR title

on:
    pull_request_target:
        types: [ opened, edited, synchronize ]

jobs:
    check_pr_title:
        name: 'Check PR title'
        runs-on: ubuntu-latest
        steps:
            -   uses: amannn/action-semantic-pull-request@v5.5.3
                env:
                    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}


================================================
File: /.github/styles/Microsoft/Wordiness.yml
================================================
extends: substitution
message: "Consider using '%s' instead of '%s'."
link: https://docs.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences
ignorecase: true
level: warning
action:
  name: replace
swap:
  (?:give|gave) rise to: lead to
  (?:previous|prior) to: before
  a (?:large)? majority of: most
  a (?:large)? number of: many
  a myriad of: myriad
  adversely impact: hurt
  all across: across
  all of a sudden: suddenly
  all of these: these
  all of: all
  all-time record: record
  almost all: most
  almost never: seldom
  along the lines of: similar to
  an adequate number of: enough
  an appreciable number of: many
  an estimated: about
  any and all: all
  are in agreement: agree
  as a matter of fact: in fact
  as a means of: to
  as a result of: because of
  as of yet: yet
  as per: per
  at a later date: later
  at all times: always
  at the present time: now
  at this point in time: at this point
  based in large part on: based on
  based on the fact that: because
  basic necessity: necessity
  because of the fact that: because
  came to a realization: realized
  came to an abrupt end: ended abruptly
  carry out an evaluation of: evaluate
  close down: close
  closed down: closed
  complete stranger: stranger
  completely separate: separate
  concerning the matter of: regarding
  conduct a review of: review
  conduct an investigation: investigate
  conduct experiments: experiment
  continue on: continue
  despite the fact that: although
  disappear from sight: disappear
  drag and drop: drag
  drag-and-drop: drag
  doomed to fail: doomed
  due to the fact that: because
  during the period of: during
  during the time that: while
  emergency situation: emergency
  except when: unless
  excessive number: too many
  extend an invitation: invite
  fall down: fall
  fell down: fell
  for the duration of: during
  gather together: gather
  has the ability to: can
  has the capacity to: can
  has the opportunity to: could
  hold a meeting: meet
  if this is not the case: if not
  in a careful manner: carefully
  in a thoughtful manner: thoughtfully
  in a timely manner: timely
  in an effort to: to
  in between: between
  in lieu of: instead of
  in many cases: often
  in most cases: usually
  in order to: to
  in some cases: sometimes
  in spite of the fact that: although
  in spite of: despite
  in the (?:very)? near future: soon
  in the event that: if
  in the neighborhood of: roughly
  in the vicinity of: close to
  it would appear that: apparently
  lift up: lift
  made reference to: referred to
  make reference to: refer to
  mix together: mix
  none at all: none
  not in a position to: unable
  not possible: impossible
  of major importance: important
  perform an assessment of: assess
  pertaining to: about
  place an order: order
  plays a key role in: is essential to
  present time: now
  readily apparent: apparent
  some of the: some
  span across: span
  subsequent to: after
  successfully complete: complete
  sufficient number (?:of)?: enough
  take action: act
  take into account: consider
  the question as to whether: whether
  there is no doubt but that: doubtless
  this day and age: this age
  this is a subject that: this subject
  time (?:frame|period): time
  under the provisions of: under
  until such time as: until
  used for fuel purposes: used for fuel
  whether or not: whether
  with regard to: regarding
  with the exception of: except for


================================================
File: /.github/styles/Microsoft/Semicolon.yml
================================================
extends: existence
message: "Try to simplify this sentence."
link: https://docs.microsoft.com/en-us/style-guide/punctuation/semicolons
nonword: true
scope: sentence
level: suggestion
tokens:
  - ';'


================================================
File: /.github/styles/Microsoft/DateFormat.yml
================================================
extends: existence
message: Use 'July 31, 2016' format, not '%s'.
link: https://docs.microsoft.com/en-us/style-guide/a-z-word-list-term-collections/term-collections/date-time-terms
ignorecase: true
level: error
nonword: true
tokens:
  - '\d{1,2} (?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)|May|Jun(?:e)|Jul(?:y)|Aug(?:ust)|Sep(?:tember)?|Oct(?:ober)|Nov(?:ember)?|Dec(?:ember)?) \d{4}'


================================================
File: /.github/styles/Microsoft/GeneralURL.yml
================================================
extends: existence
message: "For a general audience, use 'address' rather than 'URL'."
link: https://docs.microsoft.com/en-us/style-guide/urls-web-addresses
level: warning
action:
  name: replace
  params:
    - URL
    - address
tokens:
  - URL


================================================
File: /.github/styles/Microsoft/Acronyms.yml
================================================
extends: conditional
message: "'%s' has no definition."
link: https://docs.microsoft.com/en-us/style-guide/acronyms
level: suggestion
ignorecase: false
# Ensures that the existence of 'first' implies the existence of 'second'.
first: '\b([A-Z]{3,5})\b'
second: '(?:\b[A-Z][a-z]+ )+\(([A-Z]{3,5})\)'
# ... with the exception of these:
exceptions:
  - API
  - ASP
  - CLI
  - CPU
  - CSS
  - CSV
  - DEBUG
  - DOM
  - DPI
  - FAQ
  - GCC
  - GDB
  - GET
  - GPU
  - GTK
  - GUI
  - HTML
  - HTTP
  - HTTPS
  - IDE
  - JAR
  - JSON
  - JSX
  - LESS
  - LLDB
  - NET
  - NOTE
  - NVDA
  - OSS
  - PATH
  - PDF
  - PHP
  - POST
  - RAM
  - REPL
  - RSA
  - SCM
  - SCSS
  - SDK
  - SQL
  - SSH
  - SSL
  - SVG
  - TBD
  - TCP
  - TODO
  - URI
  - URL
  - USB
  - UTF
  - XML
  - XSS
  - YAML
  - ZIP


================================================
File: /.github/styles/Microsoft/ComplexWords.yml
================================================
extends: substitution
message: "Consider using '%s' instead of '%s'."
link: https://docs.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences
ignorecase: true
level: suggestion
action:
  name: replace
swap:
  "approximate(?:ly)?": about
  abundance: plenty
  accelerate: speed up
  accentuate: stress
  accompany: go with
  accomplish: carry out|do
  accorded: given
  accordingly: so
  accrue: add
  accurate: right|exact
  acquiesce: agree
  acquire: get|buy
  additional: more|extra
  address: discuss
  addressees: you
  adjacent to: next to
  adjustment: change
  admissible: allowed
  advantageous: helpful
  advise: tell
  aggregate: total
  aircraft: plane
  alleviate: ease
  allocate: assign|divide
  alternatively: or
  alternatives: choices|options
  ameliorate: improve
  amend: change
  anticipate: expect
  apparent: clear|plain
  ascertain: discover|find out
  assistance: help
  attain: meet
  attempt: try
  authorize: allow
  belated: late
  bestow: give
  cease: stop|end
  collaborate: work together
  commence: begin
  compensate: pay
  component: part
  comprise: form|include
  concept: idea
  concerning: about
  confer: give|award
  consequently: so
  consolidate: merge
  constitutes: forms
  contains: has
  convene: meet
  demonstrate: show|prove
  depart: leave
  designate: choose
  desire: want|wish
  determine: decide|find
  detrimental: bad|harmful
  disclose: share|tell
  discontinue: stop
  disseminate: send|give
  eliminate: end
  elucidate: explain
  employ: use
  enclosed: inside|included
  encounter: meet
  endeavor: try
  enumerate: count
  equitable: fair
  equivalent: equal
  exclusively: only
  expedite: hurry
  facilitate: ease
  females: women
  finalize: complete|finish
  frequently: often
  identical: same
  incorrect: wrong
  indication: sign
  initiate: start|begin
  itemized: listed
  jeopardize: risk
  liaise: work with|partner with
  maintain: keep|support
  methodology: method
  modify: change
  monitor: check|watch
  multiple: many
  necessitate: cause
  notify: tell
  numerous: many
  objective: aim|goal
  obligate: bind|compel
  optimum: best|most
  permit: let
  portion: part
  possess: own
  previous: earlier
  previously: before
  prioritize: rank
  procure: buy
  provide: give|offer
  purchase: buy
  relocate: move
  solicit: request
  state-of-the-art: latest
  subsequent: later|next
  substantial: large
  sufficient: enough
  terminate: end
  transmit: send
  utilization: use
  utilize: use


================================================
File: /.github/styles/Microsoft/HeadingColons.yml
================================================
extends: existence
message: "Capitalize '%s'."
link: https://docs.microsoft.com/en-us/style-guide/punctuation/colons
nonword: true
level: error
scope: heading
tokens:
  - ':\s[a-z]'


================================================
File: /.github/styles/Microsoft/Ellipses.yml
================================================
extends: existence
message: "In general, don't use an ellipsis."
link: https://docs.microsoft.com/en-us/style-guide/punctuation/ellipses
nonword: true
level: warning
action:
  name: remove
tokens:
  - '\.\.\.'


================================================
File: /.github/styles/Microsoft/Auto.yml
================================================
extends: existence
message: "In general, don't hyphenate '%s'."
link: https://docs.microsoft.com/en-us/style-guide/a-z-word-list-term-collections/a/auto
ignorecase: true
level: error
action:
  name: convert
  params:
    - simple
tokens:
  - 'auto-\w+'


================================================
File: /.github/styles/Microsoft/RangeTime.yml
================================================
extends: existence
message: "Use 'to' instead of a dash in '%s'."
link: https://docs.microsoft.com/en-us/style-guide/numbers
nonword: true
level: error
action:
  name: edit
  params:
    - replace
    - '[-–]'
    - 'to'
tokens:
  - '\b(?:AM|PM)\s?[-–]\s?.+(?:AM|PM)\b'


================================================
File: /.github/styles/Microsoft/We.yml
================================================
extends: existence
message: "Try to avoid using first-person plural like '%s'."
link: https://docs.microsoft.com/en-us/style-guide/grammar/person#avoid-first-person-plural
level: warning
ignorecase: true
tokens:
  - we
  - we'(?:ve|re)
  - ours?
  - us
  - let's


================================================
File: /.github/styles/Microsoft/Adverbs.yml
================================================
extends: existence
message: "Consider removing '%s'."
link: https://docs.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences
ignorecase: true
level: warning
action:
  name: remove
tokens:
  - abnormally
  - absentmindedly
  - accidentally
  - adventurously
  - anxiously
  - arrogantly
  - awkwardly
  - bashfully
  - beautifully
  - bitterly
  - bleakly
  - blindly
  - blissfully
  - boastfully
  - boldly
  - bravely
  - briefly
  - brightly
  - briskly
  - broadly
  - busily
  - calmly
  - carefully
  - carelessly
  - cautiously
  - cheerfully
  - cleverly
  - closely
  - coaxingly
  - colorfully
  - continually
  - coolly
  - courageously
  - crossly
  - cruelly
  - curiously
  - daintily
  - dearly
  - deceivingly
  - deeply
  - defiantly
  - deliberately
  - delightfully
  - diligently
  - dimly
  - doubtfully
  - dreamily
  - easily
  - elegantly
  - energetically
  - enormously
  - enthusiastically
  - excitedly
  - extremely
  - fairly
  - faithfully
  - famously
  - ferociously
  - fervently
  - fiercely
  - fondly
  - foolishly
  - fortunately
  - frankly
  - frantically
  - freely
  - frenetically
  - frightfully
  - furiously
  - generally
  - generously
  - gently
  - gladly
  - gleefully
  - gracefully
  - gratefully
  - greatly
  - greedily
  - happily
  - hastily
  - healthily
  - heavily
  - helplessly
  - honestly
  - hopelessly
  - hungrily
  - innocently
  - inquisitively
  - intensely
  - intently
  - interestingly
  - inwardly
  - irritably
  - jaggedly
  - jealously
  - jovially
  - joyfully
  - joyously
  - jubilantly
  - judgmentally
  - justly
  - keenly
  - kiddingly
  - kindheartedly
  - knavishly
  - knowingly
  - knowledgeably
  - lazily
  - lightly
  - limply
  - lively
  - loftily
  - longingly
  - loosely
  - loudly
  - lovingly
  - loyally
  - madly
  - majestically
  - meaningfully
  - mechanically
  - merrily
  - miserably
  - mockingly
  - mortally
  - mysteriously
  - naturally
  - nearly
  - neatly
  - nervously
  - nicely
  - noisily
  - obediently
  - obnoxiously
  - oddly
  - offensively
  - optimistically
  - overconfidently
  - painfully
  - partially
  - patiently
  - perfectly
  - playfully
  - politely
  - poorly
  - positively
  - potentially
  - powerfully
  - promptly
  - properly
  - punctually
  - quaintly
  - queasily
  - queerly
  - questionably
  - quickly
  - quietly
  - quirkily
  - quizzically
  - randomly
  - rapidly
  - rarely
  - readily
  - really
  - reassuringly
  - recklessly
  - regularly
  - reluctantly
  - repeatedly
  - reproachfully
  - restfully
  - righteously
  - rightfully
  - rigidly
  - roughly
  - rudely
  - safely
  - scarcely
  - scarily
  - searchingly
  - sedately
  - seemingly
  - selfishly
  - separately
  - seriously
  - shakily
  - sharply
  - sheepishly
  - shrilly
  - shyly
  - silently
  - sleepily
  - slowly
  - smoothly
  - softly
  - solemnly
  - solidly
  - speedily
  - stealthily
  - sternly
  - strictly
  - suddenly
  - supposedly
  - surprisingly
  - suspiciously
  - sweetly
  - swiftly
  - sympathetically
  - tenderly
  - tensely
  - terribly
  - thankfully
  - thoroughly
  - thoughtfully
  - tightly
  - tremendously
  - triumphantly
  - truthfully
  - ultimately
  - unabashedly
  - unaccountably
  - unbearably
  - unethically
  - unexpectedly
  - unfortunately
  - unimpressively
  - unnaturally
  - unnecessarily
  - urgently
  - usefully
  - uselessly
  - utterly
  - vacantly
  - vaguely
  - vainly
  - valiantly
  - vastly
  - verbally
  - very
  - viciously
  - victoriously
  - violently
  - vivaciously
  - voluntarily
  - warmly
  - weakly
  - wearily
  - wetly
  - wholly
  - wildly
  - willfully
  - wisely
  - woefully
  - wonderfully
  - worriedly
  - yawningly
  - yearningly
  - yieldingly
  - youthfully
  - zealously
  - zestfully
  - zestily


================================================
File: /.github/styles/Microsoft/meta.json
================================================
{
  "feed": "https://github.com/errata-ai/Microsoft/releases.atom",
  "vale_version": ">=1.0.0"
}


================================================
File: /.github/styles/Microsoft/Passive.yml
================================================
extends: existence
message: "'%s' looks like passive voice."
ignorecase: true
level: suggestion
raw:
  - \b(am|are|were|being|is|been|was|be)\b\s*
tokens:
  - '[\w]+ed'
  - awoken
  - beat
  - become
  - been
  - begun
  - bent
  - beset
  - bet
  - bid
  - bidden
  - bitten
  - bled
  - blown
  - born
  - bought
  - bound
  - bred
  - broadcast
  - broken
  - brought
  - built
  - burnt
  - burst
  - cast
  - caught
  - chosen
  - clung
  - come
  - cost
  - crept
  - cut
  - dealt
  - dived
  - done
  - drawn
  - dreamt
  - driven
  - drunk
  - dug
  - eaten
  - fallen
  - fed
  - felt
  - fit
  - fled
  - flown
  - flung
  - forbidden
  - foregone
  - forgiven
  - forgotten
  - forsaken
  - fought
  - found
  - frozen
  - given
  - gone
  - gotten
  - ground
  - grown
  - heard
  - held
  - hidden
  - hit
  - hung
  - hurt
  - kept
  - knelt
  - knit
  - known
  - laid
  - lain
  - leapt
  - learnt
  - led
  - left
  - lent
  - let
  - lighted
  - lost
  - made
  - meant
  - met
  - misspelt
  - mistaken
  - mown
  - overcome
  - overdone
  - overtaken
  - overthrown
  - paid
  - pled
  - proven
  - put
  - quit
  - read
  - rid
  - ridden
  - risen
  - run
  - rung
  - said
  - sat
  - sawn
  - seen
  - sent
  - set
  - sewn
  - shaken
  - shaven
  - shed
  - shod
  - shone
  - shorn
  - shot
  - shown
  - shrunk
  - shut
  - slain
  - slept
  - slid
  - slit
  - slung
  - smitten
  - sold
  - sought
  - sown
  - sped
  - spent
  - spilt
  - spit
  - split
  - spoken
  - spread
  - sprung
  - spun
  - stolen
  - stood
  - stridden
  - striven
  - struck
  - strung
  - stuck
  - stung
  - stunk
  - sung
  - sunk
  - swept
  - swollen
  - sworn
  - swum
  - swung
  - taken
  - taught
  - thought
  - thrived
  - thrown
  - thrust
  - told
  - torn
  - trodden
  - understood
  - upheld
  - upset
  - wed
  - wept
  - withheld
  - withstood
  - woken
  - won
  - worn
  - wound
  - woven
  - written
  - wrung


================================================
File: /.github/styles/Microsoft/Units.yml
================================================
extends: existence
message: "Don't spell out the number in '%s'."
link: https://docs.microsoft.com/en-us/style-guide/a-z-word-list-term-collections/term-collections/units-of-measure-terms
level: error
raw:
  - '[a-zA-Z]+\s'
tokens:
  - '(?:centi|milli)?meters'
  - '(?:kilo)?grams'
  - '(?:kilo)?meters'
  - '(?:mega)?pixels'
  - cm
  - inches
  - lb
  - miles
  - pounds


================================================
File: /.github/styles/Microsoft/SentenceLength.yml
================================================
extends: occurrence
message: "Try to keep sentences short (< 30 words)."
scope: sentence
level: suggestion
max: 30
token: \b(\w+)\b



================================================
File: /.github/styles/Microsoft/FirstPerson.yml
================================================
extends: existence
message: "Use first person (such as '%s') sparingly."
link: https://docs.microsoft.com/en-us/style-guide/grammar/person
ignorecase: true
level: warning
nonword: true
tokens:
  - (?:^|\s)I\s
  - (?:^|\s)I,\s
  - \bI'd\b
  - \bI'll\b
  - \bI'm\b
  - \bI've\b
  - \bme\b
  - \bmy\b
  - \bmine\b


================================================
File: /.github/styles/Microsoft/Terms.yml
================================================
extends: substitution
message: "Prefer '%s' over '%s'."
# term preference should be based on microsoft style guide, such as
link: https://learn.microsoft.com/en-us/style-guide/a-z-word-list-term-collections/a/adapter
level: warning
ignorecase: true
action:
  name: replace
swap:
  '(?:agent|virtual assistant|intelligent personal assistant)': personal digital assistant
  '(?:drive C:|drive C>|C: drive)': drive C
  '(?:internet bot|web robot)s?': bot(s)
  '(?:microsoft cloud|the cloud)': cloud
  '(?:mobile|smart) ?phone': phone
  '24/7': every day
  'audio(?:-| )book': audiobook
  'back(?:-| )light': backlight
  'chat ?bots?': chatbot(s)
  adaptor: adapter
  administrate: administer
  afterwards: afterward
  alphabetic: alphabetical
  alphanumerical: alphanumeric
  anti-aliasing: antialiasing
  anti-malware: antimalware
  anti-spyware: antispyware
  anti-virus: antivirus
  appendixes: appendices
  artificial intelligence: AI
  '(?:assembler|machine language)': assembly language
  caap: CaaP
  conversation-as-a-platform: conversation as a platform
  eb: EB
  gb: GB
  gbps: Gbps
  kb: KB
  keypress: keystroke
  mb: MB
  pb: PB
  tb: TB
  zb: ZB


================================================
File: /.github/styles/Microsoft/Ranges.yml
================================================
extends: existence
message: "In most cases, use 'from' or 'through' to describe a range of numbers."
link: 'https://docs.microsoft.com/en-us/style-guide/numbers'
nonword: true
level: warning
tokens:
  - '\b\d+\s?[-–]\s?\d+\b'


================================================
File: /.github/styles/Microsoft/OxfordComma.yml
================================================
extends: existence
message: "Use the Oxford comma in '%s'."
link: https://docs.microsoft.com/en-us/style-guide/punctuation/commas
scope: sentence
level: suggestion
nonword: true
tokens:
  - '(?:[^\s,]+,){1,} \w+ (?:and|or) \w+[.?!]'


================================================
File: /.github/styles/Microsoft/HeadingAcronyms.yml
================================================
extends: existence
message: "Avoid using acronyms in a title or heading."
link: https://docs.microsoft.com/en-us/style-guide/acronyms#be-careful-with-acronyms-in-titles-and-headings
level: warning
scope: heading
tokens:
  - '[A-Z]{2,4}'


================================================
File: /.github/styles/Microsoft/Vocab.yml
================================================
extends: existence
message: "Verify your use of '%s' with the A-Z word list."
link: 'https://docs.microsoft.com/en-us/style-guide'
level: suggestion
ignorecase: true
tokens:
  - above
  - accessible
  - actionable
  - against
  - alarm
  - alert
  - alias
  - allows?
  - and/or
  - as well as
  - assure
  - author
  - avg
  - beta
  - ensure
  - he
  - insure
  - sample
  - she


================================================
File: /.github/styles/Microsoft/Foreign.yml
================================================
extends: substitution
message: "Use '%s' instead of '%s'."
link: https://docs.microsoft.com/en-us/style-guide/word-choice/use-us-spelling-avoid-non-english-words
ignorecase: true
level: error
nonword: true
action:
  name: replace
swap:
  '\b(?:eg|e\.g\.)[\s,]': for example
  '\b(?:ie|i\.e\.)[\s,]': that is
  '\b(?:viz\.)[\s,]': namely
  '\b(?:ergo)[\s,]': therefore


================================================
File: /.github/styles/Microsoft/Hyphens.yml
================================================
extends: existence
message: "'%s' doesn't need a hyphen."
link: https://docs.microsoft.com/en-us/style-guide/punctuation/dashes-hyphens/hyphens
level: warning
ignorecase: false
nonword: true
action:
  name: edit
  params:
    - replace
    - '-'
    - ' '
tokens:
  - '\s[^\s-]+ly-'


================================================
File: /.github/styles/Microsoft/DateOrder.yml
================================================
extends: existence
message: "Always spell out the name of the month."
link: https://docs.microsoft.com/en-us/style-guide/numbers#numbers-in-dates
ignorecase: true
level: error
nonword: true
tokens:
  - '\b\d{1,2}/\d{1,2}/(?:\d{4}|\d{2})\b'


================================================
File: /.github/styles/Microsoft/HeadingPunctuation.yml
================================================
extends: existence
message: "Don't use end punctuation in headings."
link: https://docs.microsoft.com/en-us/style-guide/punctuation/periods
nonword: true
level: warning
scope: heading
action:
  name: edit
  params:
    - remove
    - '.?!'
tokens:
  - '[a-z][.?!](?:\s|$)'


================================================
File: /.github/styles/Microsoft/Gender.yml
================================================
extends: existence
message: "Don't use '%s'."
link: https://github.com/MicrosoftDocs/microsoft-style-guide/blob/master/styleguide/grammar/nouns-pronouns.md#pronouns-and-gender
level: error
ignorecase: true
tokens:
  - he/she
  - s/he


================================================
File: /.github/styles/Microsoft/DateNumbers.yml
================================================
extends: existence
message: "Don't use ordinal numbers for dates."
link: https://docs.microsoft.com/en-us/style-guide/numbers#numbers-in-dates
level: error
nonword: true
ignorecase: true
raw:
  - \b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)|May|Jun(?:e)|Jul(?:y)|Aug(?:ust)|Sep(?:tember)?|Oct(?:ober)|Nov(?:ember)?|Dec(?:ember)?)\b\s*
tokens:
  - first
  - second
  - third
  - fourth
  - fifth
  - sixth
  - seventh
  - eighth
  - ninth
  - tenth
  - eleventh
  - twelfth
  - thirteenth
  - fourteenth
  - fifteenth
  - sixteenth
  - seventeenth
  - eighteenth
  - nineteenth
  - twentieth
  - twenty-first
  - twenty-second
  - twenty-third
  - twenty-fourth
  - twenty-fifth
  - twenty-sixth
  - twenty-seventh
  - twenty-eighth
  - twenty-ninth
  - thirtieth
  - thirty-first


================================================
File: /.github/styles/Microsoft/AMPM.yml
================================================
extends: existence
message: Use 'AM' or 'PM' (preceded by a space).
link: https://docs.microsoft.com/en-us/style-guide/a-z-word-list-term-collections/term-collections/date-time-terms
level: error
nonword: true
tokens:
  - '\d{1,2}[AP]M'
  - '\d{1,2} ?[ap]m'
  - '\d{1,2} ?[aApP]\.[mM]\.'


================================================
File: /.github/styles/Microsoft/Negative.yml
================================================
extends: existence
message: "Form a negative number with an en dash, not a hyphen."
link: https://docs.microsoft.com/en-us/style-guide/numbers
nonword: true
level: error
action:
  name: edit
  params:
    - replace
    - '-'
    - '–'
tokens:
  - '\s-\d+\s'


================================================
File: /.github/styles/Microsoft/Dashes.yml
================================================
extends: existence
message: "Remove the spaces around '%s'."
link: https://docs.microsoft.com/en-us/style-guide/punctuation/dashes-hyphens/emes
ignorecase: true
nonword: true
level: error
action:
  name: edit
  params:
    - remove
    - ' '
tokens:
  - '[—–]\s|\s[—–]'


================================================
File: /.github/styles/Microsoft/Headings.yml
================================================
extends: capitalization
message: "'%s' should use sentence-style capitalization."
link: https://docs.microsoft.com/en-us/style-guide/capitalization
level: suggestion
scope: heading
match: $sentence
indicators:
  - ':'
exceptions:
  - Azure
  - CLI
  - Code
  - Cosmos
  - Docker
  - Emmet
  - I
  - Kubernetes
  - Linux
  - macOS
  - Marketplace
  - MongoDB
  - REPL
  - Studio
  - TypeScript
  - URLs
  - Visual
  - VS
  - Windows


================================================
File: /.github/styles/Microsoft/GenderBias.yml
================================================
extends: substitution
message: "Consider using '%s' instead of '%s'."
ignorecase: true
level: error
swap:
  (?:alumna|alumnus):          graduate
  (?:alumnae|alumni):          graduates
  air(?:m[ae]n|wom[ae]n):      pilot(s)
  anchor(?:m[ae]n|wom[ae]n):   anchor(s)
  authoress:                   author
  camera(?:m[ae]n|wom[ae]n):   camera operator(s)
  chair(?:m[ae]n|wom[ae]n):    chair(s)
  congress(?:m[ae]n|wom[ae]n): member(s) of congress
  door(?:m[ae]|wom[ae]n):      concierge(s)
  draft(?:m[ae]n|wom[ae]n):    drafter(s)
  fire(?:m[ae]n|wom[ae]n):     firefighter(s)
  fisher(?:m[ae]n|wom[ae]n):   fisher(s)
  fresh(?:m[ae]n|wom[ae]n):    first-year student(s)
  garbage(?:m[ae]n|wom[ae]n):  waste collector(s)
  lady lawyer:                 lawyer
  ladylike:                    courteous
  landlord:                    building manager
  mail(?:m[ae]n|wom[ae]n):     mail carriers
  man and wife:                husband and wife
  man enough:                  strong enough
  mankind:                     human kind
  manmade:                     manufactured
  manpower:                    personnel
  men and girls:               men and women
  middle(?:m[ae]n|wom[ae]n):   intermediary
  news(?:m[ae]n|wom[ae]n):     journalist(s)
  ombuds(?:man|woman):         ombuds
  oneupmanship:                upstaging
  poetess:                     poet
  police(?:m[ae]n|wom[ae]n):   police officer(s)
  repair(?:m[ae]n|wom[ae]n):   technician(s)
  sales(?:m[ae]n|wom[ae]n):    salesperson or sales people
  service(?:m[ae]n|wom[ae]n):  soldier(s)
  steward(?:ess)?:             flight attendant
  tribes(?:m[ae]n|wom[ae]n):   tribe member(s)
  waitress:                    waiter
  woman doctor:                doctor
  woman scientist[s]?:         scientist(s)
  work(?:m[ae]n|wom[ae]n):     worker(s)


================================================
File: /.github/styles/Microsoft/Accessibility.yml
================================================
extends: existence
message: "Don't use language (such as '%s') that defines people by their disability."
link: https://docs.microsoft.com/en-us/style-guide/a-z-word-list-term-collections/term-collections/accessibility-terms
level: suggestion
ignorecase: true
tokens:
  - a victim of
  - able-bodied
  - affected by
  - an epileptic
  - crippled
  - disabled
  - dumb
  - handicapped
  - handicaps
  - healthy
  - lame
  - maimed
  - missing a limb
  - mute
  - normal
  - sight-impaired
  - stricken with
  - suffers from
  - vision-impaired


================================================
File: /.github/styles/Microsoft/URLFormat.yml
================================================
extends: substitution
message: "Use '%s' instead of '%s'."
ignorecase: true
level: error
action:
  name: replace
swap:
  URL for: URL of
  an URL: a URL



================================================
File: /.github/styles/Microsoft/Percentages.yml
================================================
extends: existence
message: "Use a numeral plus the units."
link: https://docs.microsoft.com/en-us/style-guide/numbers
nonword: true
level: error
tokens:
  - '\b[a-zA-z]+\spercent\b'


================================================
File: /.github/styles/Microsoft/Spacing.yml
================================================
extends: existence
message: "'%s' should have one space."
link: https://docs.microsoft.com/en-us/style-guide/punctuation/periods
level: error
nonword: true
tokens:
  - '[a-z][.?!] {2,}[A-Z]'
  - '[a-z][.?!][A-Z]'


================================================
File: /.github/styles/Microsoft/Quotes.yml
================================================
extends: existence
message: 'Punctuation should be inside the quotes.'
link: https://docs.microsoft.com/en-us/style-guide/punctuation/quotation-marks
level: error
nonword: true
tokens:
  - '["“][^"”“]+["”][.,]'


================================================
File: /.github/styles/Microsoft/Ordinal.yml
================================================
extends: existence
message: "Don't add -ly to an ordinal number."
link: https://docs.microsoft.com/en-us/style-guide/numbers
level: error
action:
  name: edit
  params:
    - trim
    - ly
tokens:
  - firstly
  - secondly
  - thirdly


================================================
File: /.github/styles/Microsoft/Contractions.yml
================================================
extends: substitution
message: "Use '%s' instead of '%s'."
link: https://docs.microsoft.com/en-us/style-guide/word-choice/use-contractions
level: error
ignorecase: true
action:
  name: replace
swap:
  are not: aren't
  cannot: can't
  could not: couldn't
  did not: didn't
  do not: don't
  does not: doesn't
  has not: hasn't
  have not: haven't
  how is: how's
  is not: isn't

  'it is(?!\.)': it's
  'it''s(?=\.)': it is

  should not: shouldn't

  "that is(?![.,])": that's
  'that''s(?=\.)': that is

  'they are(?!\.)': they're
  'they''re(?=\.)': they are

  was not: wasn't

  'we are(?!\.)': we're
  'we''re(?=\.)': we are

  'we have(?!\.)': we've
  'we''ve(?=\.)': we have

  were not: weren't

  'what is(?!\.)': what's
  'what''s(?=\.)': what is

  'when is(?!\.)': when's
  'when''s(?=\.)': when is

  'where is(?!\.)': where's
  'where''s(?=\.)': where is

  will not: won't


================================================
File: /.github/styles/Microsoft/Avoid.yml
================================================
extends: existence
message: "Don't use '%s'. See the A-Z word list for details."
# See the A-Z word list
link: https://docs.microsoft.com/en-us/style-guide
ignorecase: true
level: error
tokens:
  - abortion
  - and so on
  - app(?:lication)?s? (?:developer|program)
  - app(?:lication)? file
  - backbone
  - backend
  - contiguous selection


================================================
File: /.github/styles/Microsoft/Suspended.yml
================================================
extends: existence
message: "Don't use '%s' unless space is limited."
link: https://docs.microsoft.com/en-us/style-guide/punctuation/dashes-hyphens/hyphens
ignorecase: true
level: warning
tokens:
  - '\w+- and \w+-'


================================================
File: /.github/styles/Microsoft/RangeFormat.yml
================================================
extends: existence
message: "Use an en dash in a range of numbers."
link: https://docs.microsoft.com/en-us/style-guide/numbers
nonword: true
level: error
action:
  name: edit
  params:
    - replace
    - '-'
    - '–'
tokens:
  - '\b\d+\s?[-]\s?\d+\b'


================================================
File: /.github/styles/write-good/Cliches.yml
================================================
extends: existence
message: "Try to avoid using clichés like '%s'."
ignorecase: true
level: warning
tokens:
  - a chip off the old block
  - a clean slate
  - a dark and stormy night
  - a far cry
  - a fine kettle of fish
  - a loose cannon
  - a penny saved is a penny earned
  - a tough row to hoe
  - a word to the wise
  - ace in the hole
  - acid test
  - add insult to injury
  - against all odds
  - air your dirty laundry
  - all fun and games
  - all in a day's work
  - all talk, no action
  - all thumbs
  - all your eggs in one basket
  - all's fair in love and war
  - all's well that ends well
  - almighty dollar
  - American as apple pie
  - an axe to grind
  - another day, another dollar
  - armed to the teeth
  - as luck would have it
  - as old as time
  - as the crow flies
  - at loose ends
  - at my wits end
  - avoid like the plague
  - babe in the woods
  - back against the wall
  - back in the saddle
  - back to square one
  - back to the drawing board
  - bad to the bone
  - badge of honor
  - bald faced liar
  - ballpark figure
  - banging your head against a brick wall
  - baptism by fire
  - barking up the wrong tree
  - bat out of hell
  - be all and end all
  - beat a dead horse
  - beat around the bush
  - been there, done that
  - beggars can't be choosers
  - behind the eight ball
  - bend over backwards
  - benefit of the doubt
  - bent out of shape
  - best thing since sliced bread
  - bet your bottom dollar
  - better half
  - better late than never
  - better mousetrap
  - better safe than sorry
  - between a rock and a hard place
  - beyond the pale
  - bide your time
  - big as life
  - big cheese
  - big fish in a small pond
  - big man on campus
  - bigger they are the harder they fall
  - bird in the hand
  - bird's eye view
  - birds and the bees
  - birds of a feather flock together
  - bit the hand that feeds you
  - bite the bullet
  - bite the dust
  - bitten off more than he can chew
  - black as coal
  - black as pitch
  - black as the ace of spades
  - blast from the past
  - bleeding heart
  - blessing in disguise
  - blind ambition
  - blind as a bat
  - blind leading the blind
  - blood is thicker than water
  - blood sweat and tears
  - blow off steam
  - blow your own horn
  - blushing bride
  - boils down to
  - bolt from the blue
  - bone to pick
  - bored stiff
  - bored to tears
  - bottomless pit
  - boys will be boys
  - bright and early
  - brings home the bacon
  - broad across the beam
  - broken record
  - brought back to reality
  - bull by the horns
  - bull in a china shop
  - burn the midnight oil
  - burning question
  - burning the candle at both ends
  - burst your bubble
  - bury the hatchet
  - busy as a bee
  - by hook or by crook
  - call a spade a spade
  - called onto the carpet
  - calm before the storm
  - can of worms
  - can't cut the mustard
  - can't hold a candle to
  - case of mistaken identity
  - cat got your tongue
  - cat's meow
  - caught in the crossfire
  - caught red-handed
  - checkered past
  - chomping at the bit
  - cleanliness is next to godliness
  - clear as a bell
  - clear as mud
  - close to the vest
  - cock and bull story
  - cold shoulder
  - come hell or high water
  - cool as a cucumber
  - cool, calm, and collected
  - cost a king's ransom
  - count your blessings
  - crack of dawn
  - crash course
  - creature comforts
  - cross that bridge when you come to it
  - crushing blow
  - cry like a baby
  - cry me a river
  - cry over spilt milk
  - crystal clear
  - curiosity killed the cat
  - cut and dried
  - cut through the red tape
  - cut to the chase
  - cute as a bugs ear
  - cute as a button
  - cute as a puppy
  - cuts to the quick
  - dark before the dawn
  - day in, day out
  - dead as a doornail
  - devil is in the details
  - dime a dozen
  - divide and conquer
  - dog and pony show
  - dog days
  - dog eat dog
  - dog tired
  - don't burn your bridges
  - don't count your chickens
  - don't look a gift horse in the mouth
  - don't rock the boat
  - don't step on anyone's toes
  - don't take any wooden nickels
  - down and out
  - down at the heels
  - down in the dumps
  - down the hatch
  - down to earth
  - draw the line
  - dressed to kill
  - dressed to the nines
  - drives me up the wall
  - dull as dishwater
  - dyed in the wool
  - eagle eye
  - ear to the ground
  - early bird catches the worm
  - easier said than done
  - easy as pie
  - eat your heart out
  - eat your words
  - eleventh hour
  - even the playing field
  - every dog has its day
  - every fiber of my being
  - everything but the kitchen sink
  - eye for an eye
  - face the music
  - facts of life
  - fair weather friend
  - fall by the wayside
  - fan the flames
  - feast or famine
  - feather your nest
  - feathered friends
  - few and far between
  - fifteen minutes of fame
  - filthy vermin
  - fine kettle of fish
  - fish out of water
  - fishing for a compliment
  - fit as a fiddle
  - fit the bill
  - fit to be tied
  - flash in the pan
  - flat as a pancake
  - flip your lid
  - flog a dead horse
  - fly by night
  - fly the coop
  - follow your heart
  - for all intents and purposes
  - for the birds
  - for what it's worth
  - force of nature
  - force to be reckoned with
  - forgive and forget
  - fox in the henhouse
  - free and easy
  - free as a bird
  - fresh as a daisy
  - full steam ahead
  - fun in the sun
  - garbage in, garbage out
  - gentle as a lamb
  - get a kick out of
  - get a leg up
  - get down and dirty
  - get the lead out
  - get to the bottom of
  - get your feet wet
  - gets my goat
  - gilding the lily
  - give and take
  - go against the grain
  - go at it tooth and nail
  - go for broke
  - go him one better
  - go the extra mile
  - go with the flow
  - goes without saying
  - good as gold
  - good deed for the day
  - good things come to those who wait
  - good time was had by all
  - good times were had by all
  - greased lightning
  - greek to me
  - green thumb
  - green-eyed monster
  - grist for the mill
  - growing like a weed
  - hair of the dog
  - hand to mouth
  - happy as a clam
  - happy as a lark
  - hasn't a clue
  - have a nice day
  - have high hopes
  - have the last laugh
  - haven't got a row to hoe
  - head honcho
  - head over heels
  - hear a pin drop
  - heard it through the grapevine
  - heart's content
  - heavy as lead
  - hem and haw
  - high and dry
  - high and mighty
  - high as a kite
  - hit paydirt
  - hold your head up high
  - hold your horses
  - hold your own
  - hold your tongue
  - honest as the day is long
  - horns of a dilemma
  - horse of a different color
  - hot under the collar
  - hour of need
  - I beg to differ
  - icing on the cake
  - if the shoe fits
  - if the shoe were on the other foot
  - in a jam
  - in a jiffy
  - in a nutshell
  - in a pig's eye
  - in a pinch
  - in a word
  - in hot water
  - in the gutter
  - in the nick of time
  - in the thick of it
  - in your dreams
  - it ain't over till the fat lady sings
  - it goes without saying
  - it takes all kinds
  - it takes one to know one
  - it's a small world
  - it's only a matter of time
  - ivory tower
  - Jack of all trades
  - jockey for position
  - jog your memory
  - joined at the hip
  - judge a book by its cover
  - jump down your throat
  - jump in with both feet
  - jump on the bandwagon
  - jump the gun
  - jump to conclusions
  - just a hop, skip, and a jump
  - just the ticket
  - justice is blind
  - keep a stiff upper lip
  - keep an eye on
  - keep it simple, stupid
  - keep the home fires burning
  - keep up with the Joneses
  - keep your chin up
  - keep your fingers crossed
  - kick the bucket
  - kick up your heels
  - kick your feet up
  - kid in a candy store
  - kill two birds with one stone
  - kiss of death
  - knock it out of the park
  - knock on wood
  - knock your socks off
  - know him from Adam
  - know the ropes
  - know the score
  - knuckle down
  - knuckle sandwich
  - knuckle under
  - labor of love
  - ladder of success
  - land on your feet
  - lap of luxury
  - last but not least
  - last hurrah
  - last-ditch effort
  - law of the jungle
  - law of the land
  - lay down the law
  - leaps and bounds
  - let sleeping dogs lie
  - let the cat out of the bag
  - let the good times roll
  - let your hair down
  - let's talk turkey
  - letter perfect
  - lick your wounds
  - lies like a rug
  - life's a bitch
  - life's a grind
  - light at the end of the tunnel
  - lighter than a feather
  - lighter than air
  - like clockwork
  - like father like son
  - like taking candy from a baby
  - like there's no tomorrow
  - lion's share
  - live and learn
  - live and let live
  - long and short of it
  - long lost love
  - look before you leap
  - look down your nose
  - look what the cat dragged in
  - looking a gift horse in the mouth
  - looks like death warmed over
  - loose cannon
  - lose your head
  - lose your temper
  - loud as a horn
  - lounge lizard
  - loved and lost
  - low man on the totem pole
  - luck of the draw
  - luck of the Irish
  - make hay while the sun shines
  - make money hand over fist
  - make my day
  - make the best of a bad situation
  - make the best of it
  - make your blood boil
  - man of few words
  - man's best friend
  - mark my words
  - meaningful dialogue
  - missed the boat on that one
  - moment in the sun
  - moment of glory
  - moment of truth
  - money to burn
  - more power to you
  - more than one way to skin a cat
  - movers and shakers
  - moving experience
  - naked as a jaybird
  - naked truth
  - neat as a pin
  - needle in a haystack
  - needless to say
  - neither here nor there
  - never look back
  - never say never
  - nip and tuck
  - nip it in the bud
  - no guts, no glory
  - no love lost
  - no pain, no gain
  - no skin off my back
  - no stone unturned
  - no time like the present
  - no use crying over spilled milk
  - nose to the grindstone
  - not a hope in hell
  - not a minute's peace
  - not in my backyard
  - not playing with a full deck
  - not the end of the world
  - not written in stone
  - nothing to sneeze at
  - nothing ventured nothing gained
  - now we're cooking
  - off the top of my head
  - off the wagon
  - off the wall
  - old hat
  - older and wiser
  - older than dirt
  - older than Methuselah
  - on a roll
  - on cloud nine
  - on pins and needles
  - on the bandwagon
  - on the money
  - on the nose
  - on the rocks
  - on the spot
  - on the tip of my tongue
  - on the wagon
  - on thin ice
  - once bitten, twice shy
  - one bad apple doesn't spoil the bushel
  - one born every minute
  - one brick short
  - one foot in the grave
  - one in a million
  - one red cent
  - only game in town
  - open a can of worms
  - open and shut case
  - open the flood gates
  - opportunity doesn't knock twice
  - out of pocket
  - out of sight, out of mind
  - out of the frying pan into the fire
  - out of the woods
  - out on a limb
  - over a barrel
  - over the hump
  - pain and suffering
  - pain in the
  - panic button
  - par for the course
  - part and parcel
  - party pooper
  - pass the buck
  - patience is a virtue
  - pay through the nose
  - penny pincher
  - perfect storm
  - pig in a poke
  - pile it on
  - pillar of the community
  - pin your hopes on
  - pitter patter of little feet
  - plain as day
  - plain as the nose on your face
  - play by the rules
  - play your cards right
  - playing the field
  - playing with fire
  - pleased as punch
  - plenty of fish in the sea
  - point with pride
  - poor as a church mouse
  - pot calling the kettle black
  - pretty as a picture
  - pull a fast one
  - pull your punches
  - pulling your leg
  - pure as the driven snow
  - put it in a nutshell
  - put one over on you
  - put the cart before the horse
  - put the pedal to the metal
  - put your best foot forward
  - put your foot down
  - quick as a bunny
  - quick as a lick
  - quick as a wink
  - quick as lightning
  - quiet as a dormouse
  - rags to riches
  - raining buckets
  - raining cats and dogs
  - rank and file
  - rat race
  - reap what you sow
  - red as a beet
  - red herring
  - reinvent the wheel
  - rich and famous
  - rings a bell
  - ripe old age
  - ripped me off
  - rise and shine
  - road to hell is paved with good intentions
  - rob Peter to pay Paul
  - roll over in the grave
  - rub the wrong way
  - ruled the roost
  - running in circles
  - sad but true
  - sadder but wiser
  - salt of the earth
  - scared stiff
  - scared to death
  - sealed with a kiss
  - second to none
  - see eye to eye
  - seen the light
  - seize the day
  - set the record straight
  - set the world on fire
  - set your teeth on edge
  - sharp as a tack
  - shoot for the moon
  - shoot the breeze
  - shot in the dark
  - shoulder to the wheel
  - sick as a dog
  - sigh of relief
  - signed, sealed, and delivered
  - sink or swim
  - six of one, half a dozen of another
  - skating on thin ice
  - slept like a log
  - slinging mud
  - slippery as an eel
  - slow as molasses
  - smart as a whip
  - smooth as a baby's bottom
  - sneaking suspicion
  - snug as a bug in a rug
  - sow wild oats
  - spare the rod, spoil the child
  - speak of the devil
  - spilled the beans
  - spinning your wheels
  - spitting image of
  - spoke with relish
  - spread like wildfire
  - spring to life
  - squeaky wheel gets the grease
  - stands out like a sore thumb
  - start from scratch
  - stick in the mud
  - still waters run deep
  - stitch in time
  - stop and smell the roses
  - straight as an arrow
  - straw that broke the camel's back
  - strong as an ox
  - stubborn as a mule
  - stuff that dreams are made of
  - stuffed shirt
  - sweating blood
  - sweating bullets
  - take a load off
  - take one for the team
  - take the bait
  - take the bull by the horns
  - take the plunge
  - takes one to know one
  - takes two to tango
  - the more the merrier
  - the real deal
  - the real McCoy
  - the red carpet treatment
  - the same old story
  - there is no accounting for taste
  - thick as a brick
  - thick as thieves
  - thin as a rail
  - think outside of the box
  - third time's the charm
  - this day and age
  - this hurts me worse than it hurts you
  - this point in time
  - three sheets to the wind
  - through thick and thin
  - throw in the towel
  - tie one on
  - tighter than a drum
  - time and time again
  - time is of the essence
  - tip of the iceberg
  - tired but happy
  - to coin a phrase
  - to each his own
  - to make a long story short
  - to the best of my knowledge
  - toe the line
  - tongue in cheek
  - too good to be true
  - too hot to handle
  - too numerous to mention
  - touch with a ten foot pole
  - tough as nails
  - trial and error
  - trials and tribulations
  - tried and true
  - trip down memory lane
  - twist of fate
  - two cents worth
  - two peas in a pod
  - ugly as sin
  - under the counter
  - under the gun
  - under the same roof
  - under the weather
  - until the cows come home
  - unvarnished truth
  - up the creek
  - uphill battle
  - upper crust
  - upset the applecart
  - vain attempt
  - vain effort
  - vanquish the enemy
  - vested interest
  - waiting for the other shoe to drop
  - wakeup call
  - warm welcome
  - watch your p's and q's
  - watch your tongue
  - watching the clock
  - water under the bridge
  - weather the storm
  - weed them out
  - week of Sundays
  - went belly up
  - wet behind the ears
  - what goes around comes around
  - what you see is what you get
  - when it rains, it pours
  - when push comes to shove
  - when the cat's away
  - when the going gets tough, the tough get going
  - white as a sheet
  - whole ball of wax
  - whole hog
  - whole nine yards
  - wild goose chase
  - will wonders never cease?
  - wisdom of the ages
  - wise as an owl
  - wolf at the door
  - words fail me
  - work like a dog
  - world weary
  - worst nightmare
  - worth its weight in gold
  - wrong side of the bed
  - yanking your chain
  - yappy as a dog
  - years young
  - you are what you eat
  - you can run but you can't hide
  - you only live once
  - you're the boss
  - young and foolish
  - young and vibrant


================================================
File: /.github/styles/write-good/ThereIs.yml
================================================
extends: existence
message: "Don't start a sentence with '%s'."
ignorecase: false
level: error
raw:
  - '(?:[;-]\s)There\s(is|are)|\bThere\s(is|are)\b'


================================================
File: /.github/styles/write-good/Illusions.yml
================================================
extends: repetition
message: "'%s' is repeated!"
level: warning
alpha: true
action:
  name: edit
  params:
    - truncate
    - " "
tokens:
  - '[^\s]+'


================================================
File: /.github/styles/write-good/meta.json
================================================
{
  "feed": "https://github.com/errata-ai/write-good/releases.atom",
  "vale_version": ">=1.0.0"
}


================================================
File: /.github/styles/write-good/Passive.yml
================================================
extends: existence
message: "'%s' may be passive voice. Use active voice if you can."
ignorecase: true
level: warning
raw:
  - \b(am|are|were|being|is|been|was|be)\b\s*
tokens:
  - '[\w]+ed'
  - awoken
  - beat
  - become
  - been
  - begun
  - bent
  - beset
  - bet
  - bid
  - bidden
  - bitten
  - bled
  - blown
  - born
  - bought
  - bound
  - bred
  - broadcast
  - broken
  - brought
  - built
  - burnt
  - burst
  - cast
  - caught
  - chosen
  - clung
  - come
  - cost
  - crept
  - cut
  - dealt
  - dived
  - done
  - drawn
  - dreamt
  - driven
  - drunk
  - dug
  - eaten
  - fallen
  - fed
  - felt
  - fit
  - fled
  - flown
  - flung
  - forbidden
  - foregone
  - forgiven
  - forgotten
  - forsaken
  - fought
  - found
  - frozen
  - given
  - gone
  - gotten
  - ground
  - grown
  - heard
  - held
  - hidden
  - hit
  - hung
  - hurt
  - kept
  - knelt
  - knit
  - known
  - laid
  - lain
  - leapt
  - learnt
  - led
  - left
  - lent
  - let
  - lighted
  - lost
  - made
  - meant
  - met
  - misspelt
  - mistaken
  - mown
  - overcome
  - overdone
  - overtaken
  - overthrown
  - paid
  - pled
  - proven
  - put
  - quit
  - read
  - rid
  - ridden
  - risen
  - run
  - rung
  - said
  - sat
  - sawn
  - seen
  - sent
  - set
  - sewn
  - shaken
  - shaven
  - shed
  - shod
  - shone
  - shorn
  - shot
  - shown
  - shrunk
  - shut
  - slain
  - slept
  - slid
  - slit
  - slung
  - smitten
  - sold
  - sought
  - sown
  - sped
  - spent
  - spilt
  - spit
  - split
  - spoken
  - spread
  - sprung
  - spun
  - stolen
  - stood
  - stridden
  - striven
  - struck
  - strung
  - stuck
  - stung
  - stunk
  - sung
  - sunk
  - swept
  - swollen
  - sworn
  - swum
  - swung
  - taken
  - taught
  - thought
  - thrived
  - thrown
  - thrust
  - told
  - torn
  - trodden
  - understood
  - upheld
  - upset
  - wed
  - wept
  - withheld
  - withstood
  - woken
  - won
  - worn
  - wound
  - woven
  - written
  - wrung


================================================
File: /.github/styles/write-good/E-Prime.yml
================================================
extends: existence
message: "Try to avoid using '%s'."
ignorecase: true
level: suggestion
tokens:
  - am
  - are
  - aren't
  - be
  - been
  - being
  - he's
  - here's
  - here's
  - how's
  - i'm
  - is
  - isn't
  - it's
  - she's
  - that's
  - there's
  - they're
  - was
  - wasn't
  - we're
  - were
  - weren't
  - what's
  - where's
  - who's
  - you're


================================================
File: /.github/styles/write-good/TooWordy.yml
================================================
extends: existence
message: "'%s' is too wordy."
ignorecase: true
level: warning
tokens:
  - a number of
  - abundance
  - accede to
  - accelerate
  - accentuate
  - accompany
  - accomplish
  - accorded
  - accrue
  - acquiesce
  - acquire
  - additional
  - adjacent to
  - adjustment
  - admissible
  - advantageous
  - adversely impact
  - advise
  - aforementioned
  - aggregate
  - aircraft
  - all of
  - all things considered
  - alleviate
  - allocate
  - along the lines of
  - already existing
  - alternatively
  - amazing
  - ameliorate
  - anticipate
  - apparent
  - appreciable
  - as a matter of fact
  - as a means of
  - as far as I'm concerned
  - as of yet
  - as to
  - as yet
  - ascertain
  - assistance
  - at the present time
  - at this time
  - attain
  - attributable to
  - authorize
  - because of the fact that
  - belated
  - benefit from
  - bestow
  - by means of
  - by virtue of
  - by virtue of the fact that
  - cease
  - close proximity
  - commence
  - comply with
  - concerning
  - consequently
  - consolidate
  - constitutes
  - demonstrate
  - depart
  - designate
  - discontinue
  - due to the fact that
  - each and every
  - economical
  - eliminate
  - elucidate
  - employ
  - endeavor
  - enumerate
  - equitable
  - equivalent
  - evaluate
  - evidenced
  - exclusively
  - expedite
  - expend
  - expiration
  - facilitate
  - factual evidence
  - feasible
  - finalize
  - first and foremost
  - for all intents and purposes
  - for the most part
  - for the purpose of
  - forfeit
  - formulate
  - have a tendency to
  - honest truth
  - however
  - if and when
  - impacted
  - implement
  - in a manner of speaking
  - in a timely manner
  - in a very real sense
  - in accordance with
  - in addition
  - in all likelihood
  - in an effort to
  - in between
  - in excess of
  - in lieu of
  - in light of the fact that
  - in many cases
  - in my opinion
  - in order to
  - in regard to
  - in some instances
  - in terms of
  - in the case of
  - in the event that
  - in the final analysis
  - in the nature of
  - in the near future
  - in the process of
  - inception
  - incumbent upon
  - indicate
  - indication
  - initiate
  - irregardless
  - is applicable to
  - is authorized to
  - is responsible for
  - it is
  - it is essential
  - it seems that
  - it was
  - magnitude
  - maximum
  - methodology
  - minimize
  - minimum
  - modify
  - monitor
  - multiple
  - necessitate
  - nevertheless
  - not certain
  - not many
  - not often
  - not unless
  - not unlike
  - notwithstanding
  - null and void
  - numerous
  - objective
  - obligate
  - obtain
  - on the contrary
  - on the other hand
  - one particular
  - optimum
  - overall
  - owing to the fact that
  - participate
  - particulars
  - pass away
  - pertaining to
  - point in time
  - portion
  - possess
  - preclude
  - previously
  - prior to
  - prioritize
  - procure
  - proficiency
  - provided that
  - purchase
  - put simply
  - readily apparent
  - refer back
  - regarding
  - relocate
  - remainder
  - remuneration
  - requirement
  - reside
  - residence
  - retain
  - satisfy
  - shall
  - should you wish
  - similar to
  - solicit
  - span across
  - strategize
  - subsequent
  - substantial
  - successfully complete
  - sufficient
  - terminate
  - the month of
  - the point I am trying to make
  - therefore
  - time period
  - took advantage of
  - transmit
  - transpire
  - type of
  - until such time as
  - utilization
  - utilize
  - validate
  - various different
  - what I mean to say is
  - whether or not
  - with respect to
  - with the exception of
  - witnessed


================================================
File: /.github/styles/write-good/So.yml
================================================
extends: existence
message: "Don't start a sentence with '%s'."
level: error
raw:
  - '(?:[;-]\s)so[\s,]|\bSo[\s,]'


================================================
File: /.github/styles/write-good/Weasel.yml
================================================
extends: existence
message: "'%s' is a weasel word!"
ignorecase: true
level: warning
tokens:
  - absolutely
  - accidentally
  - additionally
  - allegedly
  - alternatively
  - angrily
  - anxiously
  - approximately
  - awkwardly
  - badly
  - barely
  - beautifully
  - blindly
  - boldly
  - bravely
  - brightly
  - briskly
  - bristly
  - bubbly
  - busily
  - calmly
  - carefully
  - carelessly
  - cautiously
  - cheerfully
  - clearly
  - closely
  - coldly
  - completely
  - consequently
  - correctly
  - courageously
  - crinkly
  - cruelly
  - crumbly
  - cuddly
  - currently
  - daily
  - daringly
  - deadly
  - definitely
  - deliberately
  - doubtfully
  - dumbly
  - eagerly
  - early
  - easily
  - elegantly
  - enormously
  - enthusiastically
  - equally
  - especially
  - eventually
  - exactly
  - exceedingly
  - exclusively
  - extremely
  - fairly
  - faithfully
  - fatally
  - fiercely
  - finally
  - fondly
  - few
  - foolishly
  - fortunately
  - frankly
  - frantically
  - generously
  - gently
  - giggly
  - gladly
  - gracefully
  - greedily
  - happily
  - hardly
  - hastily
  - healthily
  - heartily
  - helpfully
  - honestly
  - hourly
  - hungrily
  - hurriedly
  - immediately
  - impatiently
  - inadequately
  - ingeniously
  - innocently
  - inquisitively
  - interestingly
  - irritably
  - jiggly
  - joyously
  - justly
  - kindly
  - largely
  - lately
  - lazily
  - likely
  - literally
  - lonely
  - loosely
  - loudly
  - loudly
  - luckily
  - madly
  - many
  - mentally
  - mildly
  - monthly
  - mortally
  - mostly
  - mysteriously
  - neatly
  - nervously
  - nightly
  - noisily
  - normally
  - obediently
  - occasionally
  - only
  - openly
  - painfully
  - particularly
  - patiently
  - perfectly
  - politely
  - poorly
  - powerfully
  - presumably
  - previously
  - promptly
  - punctually
  - quarterly
  - quickly
  - quietly
  - rapidly
  - rarely
  - really
  - recently
  - recklessly
  - regularly
  - remarkably
  - relatively
  - reluctantly
  - repeatedly
  - rightfully
  - roughly
  - rudely
  - sadly
  - safely
  - selfishly
  - sensibly
  - seriously
  - sharply
  - shortly
  - shyly
  - significantly
  - silently
  - simply
  - sleepily
  - slowly
  - smartly
  - smelly
  - smoothly
  - softly
  - solemnly
  - sparkly
  - speedily
  - stealthily
  - sternly
  - stupidly
  - substantially
  - successfully
  - suddenly
  - surprisingly
  - suspiciously
  - swiftly
  - tenderly
  - tensely
  - thoughtfully
  - tightly
  - timely
  - truthfully
  - unexpectedly
  - unfortunately
  - usually
  - very
  - victoriously
  - violently
  - vivaciously
  - warmly
  - waverly
  - weakly
  - wearily
  - weekly
  - wildly
  - wisely
  - worldly
  - wrinkly
  - yearly


================================================
File: /.github/styles/write-good/README.md
================================================
Based on [write-good](https://github.com/btford/write-good).

> Naive linter for English prose for developers who can't write good and wanna learn to do other stuff good too.

```
The MIT License (MIT)

Copyright (c) 2014 Brian Ford

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```


================================================
File: /.github/styles/config/vocabularies/Docs/accept.txt
================================================
apify(?=-\w+)
Actor(s)?
booleans
Docusaurus
env
navbar
nginx
npm



================================================
File: /.github/styles/Apify/Capitalization.yml
================================================
extends: existence
message: "The word '%s' should always be capitalized."
ignorecase: false
level: error
tokens:
  # Before the word there should be no: /, -, #, word character
  # (avoids anchors, URLs, identifiers, and words like 'factors')
  #
  # After the word there should be no: /, } (avoids paths or URLs)
  # Also no . followed by a word character (avoids 'actors.md')
  - '(?<![\/\-#\w])actors(?![\/\}])(?!\.\w)'

  # Before the word there should be no: /, -, #, ., `, word character
  # (avoids anchors, URLs, identifiers, code, and words like 'factors')
  #
  # After the word there should be no: /, }, -, word character (avoids paths or URLs)
  # Also no " =" (avoids code like "actor = ...")
  # Also no . followed by a word character (avoids 'actor.md' or 'actor.update()')
  - '(?<![\/\-#\.`\w])actor(?![\/\}\-\w])(?! =)(?!\.\w)'
nonword: false


================================================
File: /.github/styles/Apify/Apify.yml
================================================
extends: substitution
message: "Use '%s' instead of '%s'."
ignorecase: false
level: warning
swap:
    Apify Dashboard: Apify Console
    apify freelancers: Apify freelancers
    Apify Platform: Apify platform
    '(?:[Tt]he\s)?[Aa]pify\sproxy': Apify Proxy
    circa: approx.


================================================
File: /.github/styles/Apify/Languages.yml
================================================
extends: substitution
message: "Use '%s' instead of '%s'."
ignorecase: false
level: warning
swap:
  'javascript|Javascript|javaScript': JavaScript
  '(?<!-)python(?!-)': Python
  'typescript|Typescript|typescript': TypeScript
  'nodejs|Nodejs|node.js': Node.js
  # Add more languages or common mistakes as needed


================================================
File: /.github/CODEOWNERS
================================================
# Documentation
*.md @TC-MO
*.mdx @TC-MO

# Academy
/sources/academy/ @honzajavorek


================================================
File: /renovate.json
================================================
{
    "extends": [
        "config:base",
        ":semanticCommitTypeAll(chore)"
    ],
    "pinVersions": false,
    "separateMajorMinor": false,
    "dependencyDashboard": false,
    "semanticCommits": "enabled",
    "lockFileMaintenance": {
        "enabled": true,
        "schedule": [
            "before 2am"
        ],
        "automerge": true,
        "automergeType": "branch"
    },
    "constraints": {
        "npm": "^9.0.0"
    },
    "packageRules": [
        {
            "matchUpdateTypes": [
                "patch",
                "minor"
            ],
            "matchCurrentVersion": "!/^0/",
            "groupName": "patch/minor dependencies",
            "groupSlug": "all-non-major",
            "automerge": true,
            "automergeType": "branch"
        }
    ],
    "schedule": [
        "every weekday"
    ],
    "ignoreDeps": []
}


================================================
File: /vale.ini
================================================
StylesPath = .github/styles
MinAlertLevel = warning
IgnoredScopes = code, tt, table, tr, td

vocabularies = Docs

Packages = write-good, Microsoft

[formats]
mdx = md

[*.md]
BasedOnStyles = Apify, write-good, Microsoft

# Disabling rules (NO)
Microsoft.Contractions = NO
Microsoft.Foreign = NO
Microsoft.We = NO
Microsoft.Quotes = NO
Microsoft.ThereIs = NO
Microsoft.Auto = NO
Microsoft.URLFormat = NO
Microsoft.GeneralURL = NO
Microsoft.RangeFormat = NO


================================================
File: /sidebars.js
================================================
module.exports = {
    docs: [
        {
            type: 'category',
            label: 'Academy',
            link: {
                type: 'generated-index',
                title: 'Academy',
                slug: '/academy',
                keywords: ['academy'],
            },
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'academy',
                },
            ],
        },
        {
            type: 'category',
            label: 'Docs',
            link: {
                type: 'generated-index',
                title: 'Docs',
                slug: '/docs',
                keywords: ['docs'],
            },
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'docs',
                },
            ],
        },
        {
            type: 'category',
            label: 'Apify SDK',
            link: {
                type: 'generated-index',
                title: 'Apify SDK',
                slug: '/apify-sdk',
                keywords: ['apify-sdk'],
            },
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'apify-sdk',
                },
            ],
        },
    ],
};


================================================
File: /tsconfig.eslint.json
================================================
{
    "extends": "./tsconfig.json",
    "include": [
        "src/**/*.js",
        "src/**/*.ts",
        "src/**/*.jsx",
        "src/**/*.tsx"
    ]
}


================================================
File: /sitePlugin.js
================================================
module.exports = function () {
    return {
        name: 'custom-docusaurus-plugin',
        // eslint-disable-next-line
        configureWebpack(config, isServer, utils) {
            return {
                resolve: {
                    alias: {
                        path: require.resolve('path-browserify'),
                    },
                    fallback: {
                        fs: false,
                    },
                },
            };
        },
    };
};


================================================
File: /.eslintrc.json
================================================
{
    "extends": [
        "@apify/eslint-config-ts",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
    ],
    "parserOptions": {
        "files": ["*.js", "*.jsx", "*.ts", "*.tsx"],
        "project": "./tsconfig.eslint.json",
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2022
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "root": true,
    "env": {
        "browser": true,
        "es2020": true,
        "node": true
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "rules": {
        "quote-props": ["error", "consistent"],
        "react/prop-types": ["off"],
        "import/extensions": ["off"],
        "no-void": ["off"]
    },
    "overrides": [
        {
            "files": [
                "CONTRIBUTING.md",
                "README.md",
                "./sources/**/*.{js,json,ts,md}"
            ],
            "parserOptions": {
                "files": ["*.js", "*.jsx", "*.ts", "*.tsx", "*.md", "*.mdx"],
                "project": null,
                "ecmaFeatures": {
                    "jsx": true
                },
                "ecmaVersion": 2022
            },
            "extends":[
                "@apify/eslint-config-ts",
                "plugin:markdown/recommended",
                "plugin:json/recommended-with-comments"
            ],
            "rules": {
                // general things that are fine to have in code snippets
                "import/no-extraneous-dependencies": "off",
                "import/order": "off",
                "no-console": "off",
                "no-underscore-dangle": "off",
                "@typescript-eslint/no-unused-vars": "off",
                // not possible to use those for markdown code snippets
                "@typescript-eslint/no-floating-promises": "off",
                "@typescript-eslint/await-thenable": "off",
                "@typescript-eslint/no-misused-promises": "off",
                "@typescript-eslint/promise-function-async": "off"
            }
        }
    ],
    "ignorePatterns": ["examples/"]
}


================================================
File: /.eslintignore
================================================
node_modules
build


================================================
File: /clientModule.js
================================================
// client module for callbacks on route change
// see https://docusaurus.io/docs/advanced/client#client-module-lifecycles
export function onRouteDidUpdate({ location, previousLocation }) {
    // Don't execute if we are still on the same page; the lifecycle may be fired
    // because the hash changes (e.g. when navigating between headings)
    if (location.pathname !== previousLocation?.pathname) {
        // hubspot tracking page view
        // eslint-disable-next-line no-underscore-dangle, no-multi-assign
        const _hsq = window._hsq = window._hsq || [];
        _hsq.push(['setPath', window.location.pathname]);
        _hsq.push(['trackPageView']);
    }
}


================================================
File: /nginx.conf
================================================
server {
  listen 0.0.0.0:8080;
  server_name 'docs.apify.com';

  location / {
    proxy_pass https://apify.github.io/apify-docs/;
  }
  location /api/client/js {
    proxy_pass https://apify.github.io/apify-client-js/;
  }
  location /api/client/python {
    proxy_pass https://apify.github.io/apify-client-python/;
  }
  location /sdk/js {
    proxy_pass https://apify.github.io/apify-sdk-js/;
  }
  location /sdk/python {
    proxy_pass https://apify.github.io/apify-sdk-python/;
  }
  location /cli {
    proxy_pass https://apify.github.io/apify-cli/;
  }
  location = /health {
    access_log off;
    add_header 'Content-Type' 'application/json';
    return 200 '{"status":"UP"}';
  }

  # generated via `node tools/convert.mjs` inside the docs repository
  rewrite ^/about$ /platform/about permanent;
  rewrite ^/access-rights$ /platform/access-rights permanent;
  rewrite ^/actor$ /platform/actors permanent;
  rewrite ^/actors$ /platform/actors permanent;
  rewrite ^/tutorials/integrations$ /platform/integrations permanent;
  rewrite ^/integrations$ /platform/integrations permanent;
  rewrite ^/monitoring$ /platform/monitoring permanent;
  rewrite ^/proxy$ /platform/proxy permanent;
  rewrite ^/robotic-process-automation$ /platform/robotic-process-automation permanent;
  rewrite ^/scheduler$ /platform/schedules permanent;
  rewrite ^/schedules$ /platform/schedules permanent;
  rewrite ^/storage$ /platform/storage permanent;
  rewrite ^/scraping$ /platform/tutorials permanent;
  rewrite ^/tutorials$ /platform/tutorials permanent;
  rewrite ^/web-scraping-101$ /platform/web-scraping-101 permanent;
  rewrite ^/access-rights/list-of-permissions$ /platform/access-rights/list-of-permissions permanent;
  rewrite ^/access-rights/organization-account$ /platform/access-rights/organization-account permanent;
  rewrite ^/actor/development$ /platform/actors/development permanent;
  rewrite ^/actors/development$ /platform/actors/development permanent;
  rewrite ^/actor/examples$ /platform/actors/examples permanent;
  rewrite ^/actors/examples$ /platform/actors/examples permanent;
  rewrite ^/actor/limits$ /platform/actors/limits permanent;
  rewrite ^/actors/limits$ /platform/actors/limits permanent;
  rewrite ^/actors/paid-actors$ /platform/actors/paid-actors permanent;
  rewrite ^/actors/publishing$ /platform/actors/publishing permanent;
  rewrite ^/actor/run$ /platform/actors/running permanent;
  rewrite ^/actor/running$ /platform/actors/running permanent;
  rewrite ^/actors/run$ /platform/actors/running permanent;
  rewrite ^/actors/running$ /platform/actors/running permanent;
  rewrite ^/actor/security$ /platform/actors/security permanent;
  rewrite ^/actors/security$ /platform/actors/security permanent;
  rewrite ^/tasks$ /platform/actors/tasks permanent;
  rewrite ^/actors/tasks$ /platform/actors/tasks permanent;
  rewrite ^/integrations/slack$ /platform/integrations/slack permanent;
  rewrite ^/webhooks$ /platform/integrations/webhooks permanent;
  rewrite ^/integrations/webhooks$ /platform/integrations/webhooks permanent;
  rewrite ^/monitoring/actor-or-task-run-failure$ /platform/monitoring/actor-or-task-run-failure permanent;
  rewrite ^/monitoring/check-data-quality$ /platform/monitoring/check-data-quality permanent;
  rewrite ^/monitoring/monitor-multiple-tasks$ /platform/monitoring/monitor-multiple-tasks permanent;
  rewrite ^/monitoring/monitor-shared-datasets$ /platform/monitoring/monitor-shared-datasets permanent;
  rewrite ^/robotic-process-automation/tips-and-tricks$ /platform/robotic-process-automation/tips-and-tricks permanent;
  rewrite ^/proxy/connection-settings$ /platform/proxy/connection-settings permanent;
  rewrite ^/proxy/datacenter-proxy$ /platform/proxy/datacenter-proxy permanent;
  rewrite ^/proxy/google-serp-proxy$ /platform/proxy/google-serp-proxy permanent;
  rewrite ^/proxy/residential-proxy/nodejs-examples$ /platform/proxy/residential-proxy permanent;
  rewrite ^/proxy/residential-proxy/python-examples$ /platform/proxy/residential-proxy permanent;
  rewrite ^/proxy/residential-proxy/php-examples$ /platform/proxy/residential-proxy permanent;
  rewrite ^/proxy/residential-proxy$ /platform/proxy/residential-proxy permanent;
  rewrite ^/proxy/troubleshooting$ /platform/proxy/troubleshooting permanent;
  rewrite ^/web-scraping-101/anti-scraping-techniques$ /platform/web-scraping-101/anti-scraping-techniques permanent;
  rewrite ^/web-scraping-101/web-scraping-techniques$ /platform/web-scraping-101/web-scraping-techniques permanent;
  rewrite ^/storage/dataset$ /platform/storage/dataset permanent;
  rewrite ^/storage/key-value-store$ /platform/storage/key-value-store permanent;
  rewrite ^/storage/request-queue$ /platform/storage/request-queue permanent;
  rewrite ^/access-rights/organization-account/how-to-use$ /platform/access-rights/organization-account/how-to-use permanent;
  rewrite ^/access-rights/organization-account/setup$ /platform/access-rights/organization-account/setup permanent;
  rewrite ^/tutorials/analyze-pages-and-fix-errors$ /platform/tutorials/analyze-pages-and-fix-errors permanent;
  rewrite ^/scraping$ /platform/tutorials/apify-scrapers permanent;
  rewrite ^/tutorials/apify-scrapers$ /platform/tutorials/apify-scrapers permanent;
  rewrite ^/tutorials/building-public-actors$ /platform/tutorials/building-public-actors permanent;
  rewrite ^/tutorials/improve-performance-by-caching-repeated-page-data$ /platform/tutorials/cache-data-to-improve-performance permanent;
  rewrite ^/tutorials/cache-data-to-improve-performance$ /platform/tutorials/cache-data-to-improve-performance permanent;
  rewrite ^/tutorials/crawl-a-list-of-urls-from-a-google-sheets-document$ /platform/tutorials/crawl-urls-from-a-google-sheet permanent;
  rewrite ^/tutorials/crawl-urls-from-google-sheets-document$ /platform/tutorials/crawl-urls-from-a-google-sheet permanent;
  rewrite ^/tutorials/crawl-urls-from-a-google-sheet$ /platform/tutorials/crawl-urls-from-a-google-sheet permanent;
  rewrite ^/tutorials/log-in-by-transferring-cookies$ /platform/tutorials/log-in-by-transferring-cookies permanent;
  rewrite ^/tutorials/log-into-a-website-using-puppeteer$ /platform/tutorials/log-into-a-website-using-puppeteer permanent;
  rewrite ^/tutorials/process-data-using-python$ /platform/tutorials/process-data-using-python permanent;
  rewrite ^/actor/quick-start$ /platform/tutorials/quick-start permanent;
  rewrite ^/actors/quick-start$ /platform/tutorials/quick-start permanent;
  rewrite ^/tutorials/quick-start$ /platform/tutorials/quick-start permanent;
  rewrite ^/tutorials/integrations/run-actor-and-retrieve-data-via-api$ /platform/tutorials/run-actor-and-retrieve-data-via-api permanent;
  rewrite ^/tutorials/run-actor-and-retrieve-data-via-api$ /platform/tutorials/run-actor-and-retrieve-data-via-api permanent;
  rewrite ^/tutorials/scrape-data-using-python$ /platform/tutorials/scrape-data-using-python permanent;
  rewrite ^/tutorials/scrape-websites-with-limited-pagination$ /platform/tutorials/scrape-paginated-sites permanent;
  rewrite ^/tutorials/scrape-paginated-sites$ /platform/tutorials/scrape-paginated-sites permanent;
  rewrite ^/tutorials/scrape-websites-using-the-sitemap$ /platform/tutorials/scrape-websites-using-the-sitemap permanent;
  rewrite ^/tutorials/scraping-dynamic-content$ /platform/tutorials/scraping-dynamic-content permanent;
  rewrite ^/tutorials/use-apify-from-php$ /platform/tutorials/use-apify-from-php permanent;
  rewrite ^/actors/running/compute-units$ /platform/actors/running/compute-units permanent;
  rewrite ^/actor/run$ /platform/actors/running/input permanent;
  rewrite ^/actor/running/input-and-output$ /platform/actors/running/input permanent;
  rewrite ^/actors/running/input-and-output$ /platform/actors/running/input permanent;
  rewrite ^/actors/running/input$ /platform/actors/running/input permanent;
  rewrite ^/actors/memory-and-cpu$ /platform/actors/running/memory-and-cpu permanent;
  rewrite ^/actors/running/memory-and-cpu$ /platform/actors/running/memory-and-cpu permanent;
  rewrite ^/actors/development/actor-config$ /platform/actors/development/actor-config permanent;
  rewrite ^/actor/development/base-docker-images$ /platform/actors/development/base-docker-images permanent;
  rewrite ^/actors/development/base-docker-images$ /platform/actors/development/base-docker-images permanent;
  rewrite ^/actor/build$ /platform/actors/development/builds permanent;
  rewrite ^/actor/development/build$ /platform/actors/development/builds permanent;
  rewrite ^/actor/development/builds$ /platform/actors/development/builds permanent;
  rewrite ^/actors/build$ /platform/actors/development/builds permanent;
  rewrite ^/actors/development/builds$ /platform/actors/development/builds permanent;
  rewrite ^/actors/development/continuous-integration$ /platform/actors/development/continuous-integration permanent;
  rewrite ^/actor/development/environment-variables$ /platform/actors/development/environment-variables permanent;
  rewrite ^/actors/development/environment-variables$ /platform/actors/development/environment-variables permanent;
  rewrite ^/actor/input-schema$ /platform/actors/development/input-schema permanent;
  rewrite ^/actor/development/input-schema$ /platform/actors/development/input-schema permanent;
  rewrite ^/actors/input-schema$ /platform/actors/development/input-schema permanent;
  rewrite ^/actors/development/input-schema$ /platform/actors/development/input-schema permanent;
  rewrite ^/actors/development/output-schema$ /platform/actors/development/output-schema permanent;
  rewrite ^/actors/development/secret-input$ /platform/actors/development/secret-input permanent;
  rewrite ^/actor/source-code$ /platform/actors/development/source-code permanent;
  rewrite ^/actors/source-code$ /platform/actors/development/source-code permanent;
  rewrite ^/actor/development/source-code$ /platform/actors/development/source-code permanent;
  rewrite ^/actors/development/source-code$ /platform/actors/development/source-code permanent;
  rewrite ^/actor/development/state-persistence$ /platform/actors/development/state-persistence permanent;
  rewrite ^/actors/development/state-persistence$ /platform/actors/development/state-persistence permanent;
  rewrite ^/actors/development/testing-and-maintenance$ /platform/actors/development/testing-and-maintenance permanent;
  rewrite ^/webhooks/actions$ /platform/integrations/webhooks/actions permanent;
  rewrite ^/integrations/webhooks/actions$ /platform/integrations/webhooks/actions permanent;
  rewrite ^/webhooks/ad-hoc-webhooks$ /platform/integrations/webhooks/ad-hoc-webhooks permanent;
  rewrite ^/integrations/webhooks/ad-hoc-webhooks$ /platform/integrations/webhooks/ad-hoc-webhooks permanent;
  rewrite ^/webhooks/events$ /platform/integrations/webhooks/events permanent;
  rewrite ^/integrations/webhooks/events$ /platform/integrations/webhooks/events permanent;
  rewrite ^/proxy/datacenter-proxy/nodejs-examples$ /platform/proxy/datacenter-proxy/examples permanent;
  rewrite ^/proxy/datacenter-proxy/python-examples$ /platform/proxy/datacenter-proxy/examples permanent;
  rewrite ^/proxy/datacenter-proxy/php-examples$ /platform/proxy/datacenter-proxy/examples permanent;
  rewrite ^/proxy/datacenter-proxy/examples$ /platform/proxy/datacenter-proxy/examples permanent;
  rewrite ^/proxy/google-serp-proxy/nodejs-examples$ /platform/proxy/google-serp-proxy/examples permanent;
  rewrite ^/proxy/google-serp-proxy/python-examples$ /platform/proxy/google-serp-proxy/examples permanent;
  rewrite ^/proxy/google-serp-proxy/php-examples$ /platform/proxy/google-serp-proxy/examples permanent;
  rewrite ^/proxy/google-serp-proxy/examples$ /platform/proxy/google-serp-proxy/examples permanent;
  rewrite ^/proxy/residential-proxy/tips-and-tricks$ /platform/proxy/residential-proxy permanent;
  rewrite ^/platform/proxy/residential-proxy/tips-and-tricks$ /platform/proxy/residential-proxy permanent;
  rewrite ^/scraping/cheerio-scraper$ /platform/tutorials/apify-scrapers/cheerio-scraper permanent;
  rewrite ^/tutorials/apify-scrapers/cheerio-scraper$ /platform/tutorials/apify-scrapers/cheerio-scraper permanent;
  rewrite ^/scraping/getting-started$ /platform/tutorials/apify-scrapers/getting-started permanent;
  rewrite ^/tutorials/apify-scrapers/getting-started$ /platform/tutorials/apify-scrapers/getting-started permanent;
  rewrite ^/scraping/puppeteer-scraper$ /platform/tutorials/apify-scrapers/puppeteer-scraper permanent;
  rewrite ^/tutorials/apify-scrapers/puppeteer-scraper$ /platform/tutorials/apify-scrapers/puppeteer-scraper permanent;
  rewrite ^/scraping/web-scraper$ /platform/tutorials/apify-scrapers/web-scraper permanent;
  rewrite ^/tutorials/apify-scrapers/web-scraper$ /platform/tutorials/apify-scrapers/web-scraper permanent;

  rewrite ^/academy/apify-platform/deploying-your-code$ /academy/deploying-your-code permanent;
  rewrite ^/academy/apify-platform/get-most-of-actors$ /academy/get-most-of-actors permanent;
  rewrite ^/academy/apify-platform/getting-started$ /academy/getting-started permanent;
  rewrite ^/academy/apify-platform/running-a-web-server$ /academy/running-a-web-server permanent;
  rewrite ^/academy/apify-platform/deploying-your-code/deploying$ /academy/deploying-your-code/deploying permanent;
  rewrite ^/academy/apify-platform/deploying-your-code/docker-file$ /academy/deploying-your-code/docker-file permanent;
  rewrite ^/academy/apify-platform/deploying-your-code/input-schema$ /academy/deploying-your-code/input-schema permanent;
  rewrite ^/academy/apify-platform/deploying-your-code/inputs-outputs$ /academy/deploying-your-code/inputs-outputs permanent;
  rewrite ^/academy/apify-platform/get-most-of-actors/actor-readme$ /academy/get-most-of-actors/actor-readme permanent;
  rewrite ^/academy/apify-platform/get-most-of-actors/monetizing-your-actor$ /academy/get-most-of-actors/monetizing-your-actor permanent;
  rewrite ^/academy/apify-platform/get-most-of-actors/naming-your-actor$ /academy/get-most-of-actors/naming-your-actor permanent;
  rewrite ^/academy/apify-platform/get-most-of-actors/seo-and-promotion$ /academy/get-most-of-actors/seo-and-promotion permanent;
  rewrite ^/academy/apify-platform/getting-started/actors$ /academy/getting-started/actors permanent;
  rewrite ^/academy/apify-platform/getting-started/apify-api$ /academy/getting-started/apify-api permanent;
  rewrite ^/academy/apify-platform/getting-started/apify-client$ /academy/getting-started/apify-client permanent;
  rewrite ^/academy/apify-platform/getting-started/creating-actors$ /academy/getting-started/creating-actors permanent;
  rewrite ^/academy/apify-platform/getting-started/inputs-outputs$ /academy/getting-started/inputs-outputs permanent;
  rewrite ^/academy/web-scraping-for-beginners/data-collection$ /academy/web-scraping-for-beginners/data-extraction permanent;
  rewrite ^/academy/puppeteer-playwright/executing-scripts/extracting-data$ /academy/puppeteer-playwright/executing-scripts/collecting-data permanent;
  rewrite ^/academy/web-scraping-for-beginners/data-collection/browser-devtools$ /academy/web-scraping-for-beginners/data-extraction/browser-devtools permanent;
  rewrite ^/academy/web-scraping-for-beginners/data-collection/computer-preparation$ /academy/web-scraping-for-beginners/data-extraction/computer-preparation permanent;
  rewrite ^/academy/web-scraping-for-beginners/data-collection/devtools-continued$ /academy/web-scraping-for-beginners/data-extraction/devtools-continued permanent;
  rewrite ^/academy/web-scraping-for-beginners/data-collection/node-continued$ /academy/web-scraping-for-beginners/data-extraction/node-continued permanent;
  rewrite ^/academy/web-scraping-for-beginners/data-collection/node-js-scraper$ /academy/web-scraping-for-beginners/data-extraction/node-js-scraper permanent;
  rewrite ^/academy/web-scraping-for-beginners/data-collection/project-setup$ /academy/web-scraping-for-beginners/data-extraction/project-setup permanent;
  rewrite ^/academy/web-scraping-for-beginners/data-collection/save-to-csv$ /academy/web-scraping-for-beginners/data-extraction/save-to-csv permanent;
  rewrite ^/academy/web-scraping-for-beginners/data-collection/using-devtools$ /academy/web-scraping-for-beginners/data-extraction/using-devtools permanent;
  rewrite ^/academy/web-scraping-for-beginners/crawling/processing-data$ /academy/web-scraping-for-beginners/crawling/exporting-data permanent;
  rewrite ^/academy/web-scraping-for-beginners/crawling/recap-collection-basics$ /academy/web-scraping-for-beginners/crawling/recap-extraction-basics permanent;
  rewrite ^/academy/php/using-apify-scraper-with-php$ /academy/php/use-apify-from-php permanent;
  rewrite ^/api/client/?$ /api redirect;

  # unified api clients docs pages -> getting started page
  rewrite ^/api/client/python/docs/quick-start$ /api/client/python/docs permanent;
  rewrite ^/api/client/python/docs/features$ /api/client/python/docs permanent;
  rewrite ^/api/client/python/docs/usage-concepts$ /api/client/python/docs permanent;

  rewrite ^/api/client/js/docs/quick-start$ /api/client/js/docs permanent;
  rewrite ^/api/client/js/docs/features$ /api/client/js/docs permanent;
  rewrite ^/api/client/js/docs/usage-concepts$ /api/client/js/docs permanent;

  # sdk/js/api -> sdk/js/reference
  rewrite ^/sdk/js/api/apify(.*)$ /sdk/js/reference$1 permanent;
  rewrite ^/sdk/js/api(.*)$ /sdk/js/reference$1 permanent;
  rewrite ^/sdk/js/reference/apify(.*)$ /sdk/js/reference$1 redirect;
  rewrite ^/sdk/js/reference/next/apify(.*)$ /sdk/js/reference/next$1 redirect;
  rewrite ^/sdk/js/docs$ /sdk/js/docs/guides/apify-platform$1 redirect;
  rewrite ^/sdk/js/docs/next$ /sdk/js/docs/next/guides/apify-platform$1 redirect;
  rewrite ^/sdk/js/docs/guides/getting-started$ /sdk/js/docs/next/guides/apify-platform$1 redirect;
  rewrite ^/sdk/js/docs/next/guides/getting-started$ /sdk/js/docs/next/guides/apify-platform$1 redirect;

  # old sdk version redirects (we keep only latest, and version only major/minor)
  rewrite ^/sdk/js/docs/1\.\d+\.\d+(.*)$ /sdk/js/docs/1.3$1 redirect;
  rewrite ^/sdk/js/docs/2\.\d+\.\d+(.*)$ /sdk/js/docs/2.3$1 redirect;
  rewrite ^/sdk/js/docs/api(.*)$ /sdk/js/docs/2.3/api$1 redirect;
  rewrite ^/sdk/js/docs/typedefs(.*)$ /sdk/js/docs/2.3/typedefs$1 redirect;

  # old integrated docs -> new docs in GH pages
  rewrite ^/apify-client-js/?$ /api/client/js/ redirect;
  rewrite ^/apify-client-js/latest/?$ /api/client/js/ redirect;
  rewrite ^/apify-client-python/?$ /api/client/python/ redirect;

  # add trailing slashes to the root of GH pages docs
  rewrite ^/api/client/js$ /api/client/js/ redirect;
  rewrite ^/api/client/python$ /api/client/python/ redirect;
  rewrite ^/sdk/js$ /sdk/js/ redirect;
  rewrite ^/sdk/python$ /sdk/python/ redirect;
  rewrite ^/cli$ /cli/ redirect;

  # legacy links in some Actor READMEs
  rewrite ^/scraping/tutorial/introduction$ /academy/apify-scrapers/getting-started permanent;
  rewrite ^/scraping/tutorial/web-scraper$ /academy/apify-scrapers/web-scraper permanent;

  # Articles moved from the platform documentation to the Academy
  # Web Scraping 101
  rewrite ^/platform/web-scraping-101$                              /academy/web-scraping-for-beginners redirect;
  rewrite ^/platform/web-scraping-101/anti-scraping-techniques$     /academy/anti-scraping/techniques redirect;
  rewrite ^/platform/web-scraping-101/web-scraping-techniques$      /academy/concepts redirect;
  # RPA
  rewrite ^/platform/robotic-process-automation$                    /academy/concepts/robotic-process-automation redirect;
  rewrite ^/platform/robotic-process-automation/tips-and-tricks$    /academy/advanced-web-scraping/tips-and-tricks-robustness redirect;
  # Tutorials
  rewrite ^/platform/tutorials/scraping-dynamic-content$            /academy/puppeteer-playwright/page/waiting redirect;
  rewrite ^/platform/tutorials/log-into-a-website-using-puppeteer$  /academy/puppeteer-playwright/common-use-cases/logging-into-a-website redirect;
  rewrite ^/platform/tutorials/cache-data-to-improve-performance$   /academy/expert-scraping-with-apify/saving-useful-stats redirect;
  rewrite ^/platform/tutorials/scrape-websites-using-the-sitemap$   /academy/tutorials/scraping-with-sitemaps redirect;
  rewrite ^/platform/tutorials/analyze-pages-and-fix-errors$        /academy/analyzing-pages-and-fixing-errors redirect;
  rewrite ^/platform/tutorials/crawl-urls-from-a-google-sheet$      /academy/node-js/scraping-urls-list-from-google-sheets redirect;
  rewrite ^/platform/tutorials/log-in-by-transferring-cookies$      /academy/tools/edit-this-cookie redirect;
  rewrite ^/platform/tutorials/scrape-data-using-python$            /academy/python/scrape-data-python redirect;
  rewrite ^/platform/tutorials/process-data-using-python$           /academy/python/process-data-using-python redirect;
  rewrite ^/platform/tutorials/use-apify-from-php$                  /academy/php/using-apify-scraper-with-php redirect;
  rewrite ^/platform/tutorials/scrape-paginated-sites$              /academy/advanced-web-scraping/scraping-paginated-sites redirect;
  rewrite ^/platform/tutorials/apify-scrapers$                      /academy/apify-scrapers redirect;
  rewrite ^/platform/tutorials/apify-scrapers/getting-started$      /academy/apify-scrapers/getting-started redirect;
  rewrite ^/platform/tutorials/apify-scrapers/web-scraper$          /academy/apify-scrapers/web-scraper redirect;
  rewrite ^/platform/tutorials/apify-scrapers/cheerio-scraper$      /academy/apify-scrapers/cheerio-scraper redirect;
  rewrite ^/platform/tutorials/apify-scrapers/puppeteer-scraper$    /academy/apify-scrapers/puppeteer-scraper redirect;
  rewrite ^/platform/tutorials/run-actor-and-retrieve-data-via-api$	/academy/api/run-actor-and-retrieve-data-via-api redirect;

  # Reorganization of docs: Basic
  rewrite ^/platform/tutorials/building-public-actors$ /platform/actors/publishing redirect;
  rewrite ^/platform/actors/paid-actors$               /platform/actors/running/actors-in-store#paid-actors redirect;
  rewrite ^/platform/actors/tasks$                     /platform/actors/running/tasks redirect;
  rewrite ^/platform/actors/running/compute-units$     /platform/actors/running/usage-and-resources#what-is-a-compute-unit-cu redirect;
  rewrite ^/platform/actors/running/memory-and-cpu$    /platform/actors/running/usage-and-resources#memory redirect;
  rewrite ^/platform/actors/running/input$             /platform/actors/running/input-and-output#input redirect;
  rewrite ^/platform/actors/security$                  /platform/security redirect;
  rewrite ^/platform/actors/limits$                    /platform/limits redirect;

  # Reorganization of docs: Home
  rewrite ^/platform/about$                 /platform redirect;
  rewrite ^/platform/tutorials/quick-start$ /platform/actors/running redirect;
  rewrite ^/platform/tutorials$             /platform/actors/running redirect;

  # Reorganization of docs: Access rights
  rewrite ^/platform/access-rights$                                 /platform/collaboration/access-rights redirect;
  rewrite ^/platform/access-rights/organization-account$            /platform/collaboration/organization-account redirect;
  rewrite ^/platform/access-rights/organization-account/setup$      /platform/collaboration/organization-account/setup redirect;
  rewrite ^/platform/access-rights/organization-account/how-to-use$ /platform/collaboration/organization-account/how-to-use redirect;
  rewrite ^/platform/access-rights/list-of-permissions$             /platform/collaboration/list-of-permissions redirect;

  # Reorganization of development section
  rewrite ^/platform/actors/development/actor-config$            /platform/actors/development/actor-definition/actor-json redirect;
  rewrite ^/platform/actors/development/base-docker-images$      /platform/actors/development/actor-definition/dockerfile redirect;
  rewrite ^/platform/actors/development/secret-input$            /platform/actors/development/actor-definition/input-schema/secret-input redirect;
  rewrite ^/platform/actors/development/input-schema$            /platform/actors/development/actor-definition/input-schema/specification/v1 redirect;
  rewrite ^/platform/actors/development/output-schema$           /platform/actors/development/actor-definition/output-schema redirect;
  rewrite ^/platform/actors/development/container-web-server$    /platform/actors/development/programming-interface/container-web-server redirect;
  rewrite ^/platform/actors/development/environment-variables$   /platform/actors/development/programming-interface/environment-variables redirect;
  rewrite ^/platform/actors/development/builds$                  /platform/actors/development/builds-and-runs/builds redirect;
  rewrite ^/platform/actors/development/state-persistence$       /platform/actors/development/builds-and-runs/state-persistence redirect;
  rewrite ^/platform/actors/development/continuous-integration$  /platform/actors/development/deployment/continuous-integration redirect;
  rewrite ^/platform/actors/development/testing-and-maintenance$ /platform/actors/development/deployment/automated-tests redirect;
  rewrite ^/platform/actors/development/source-code$             /platform/actors/development/deployment/source-types redirect;

  # Rename output schema to dataset schema
  rewrite ^/platform/actors/development/actor-definition/output-schema$ /platform/actors/development/actor-definition/dataset-schema permanent;
  rewrite ^academy/deploying-your-code/output-schema$ /academy/deploying-your-code/dataset-schema permanent;

  # Removed pages
  # GPT plugins were discontinued April 9th, 2024 - https://help.openai.com/en/articles/8988022-winding-down-the-chatgpt-plugins-beta
  rewrite ^/platform/integrations/chatgpt-plugin$            https://blog.apify.com/add-custom-actions-to-your-gpts/ redirect;
}

# Temporarily used to route crawlee.dev to the Crawlee GitHub pages.
# TODO: create a separate nginx deployment for Crawlee and move this there.
server {
  listen 0.0.0.0:8080;
  server_name 'crawlee.dev';
  location / {
    proxy_pass https://apify.github.io/crawlee/;
  }
  location /python {
    proxy_pass https://apify.github.io/crawlee-python/;
  }
  # So that we can have both GH pages and crawlee.dev/python working and loading assets from the same path
  location /crawlee-python {
    proxy_pass https://apify.github.io/crawlee-python/;
  }
  # Redirect rule for "upgrading-to-v03" to "upgrading-to-v0x"
  rewrite ^/python/docs/upgrading/upgrading-to-v03$ /python/docs/upgrading/upgrading-to-v0x permanent;

  # Redirect rule so that /python/docs actually leads somewhere
  rewrite ^/python/docs/?$ /python/docs/quick-start;
}


================================================
File: /.markdownlint.json
================================================
{
    "single-title": false,
    "line-length": false,
    "code-block-style": {
        "style": "fenced"
    },
    "no-inline-html": false,
    "no-trailing-punctuation": {
        "punctuation": ".,;:。，；:"
    },
    "no-multiple-blanks": {
        "maximum": 2
    },
    "no-space-in-emphasis": false,
    "link-fragments": false,
    "no-duplicate-heading": {
        "siblings_only": true
    },
    "no-bare-urls": false
}


================================================
File: /tools/upload_to_apiary.sh
================================================
#!/bin/bash

set -ex

GIT_BRANCH=`git branch | grep \* | cut -d ' ' -f2`

# For now let's have a master and develop version as we don't change docs often.
# Develop will contain the latest non-master version pushed to GitHub.
if [ "$GIT_BRANCH" != "master" ]; then
    echo "Deploying to Apiary as develop documentation..."
    export API_NAME="apify2staging"
else
    echo "Deploying to Apiary as production documentation..."
    export API_NAME="apify2prod"
fi

apiary publish --api-name=${API_NAME} --path="./sources/platform/api_v2/api_v2_reference.apib"

if [ $? -ne 0 ]; then
    echo "ERROR: Cannot upload to Apiary (did you install apiary tool by running 'sudo gem install apiaryio'?)"
    exit 1
fi


================================================
File: /tools/utils/createHref.js
================================================
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * The SVG used below is used from docusaurus, which is licensed under the MIT license found in the
 * LICENSE file located at: https://github.com/facebook/docusaurus
 */

exports.createHref = (url, label) => {
    return `<a href="${url}" target="_blank" class="footer__link-item">
        <span>
            ${label}
            <svg
                width="13.5"
                height="13.5"
                aria-hidden="true"
                viewBox="0 0 24 24"
                style="margin-left: 0.3rem; position: relative; top: 1px;"
                >
                <path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z">
                </path>
            </svg>
        </span>
    </a>`;
};


================================================
File: /tools/utils/collectSlugs.js
================================================
const { opendirSync, readFileSync } = require('fs');
const { join } = require('path');

function collectSlugs(pathname) {
    const dir = opendirSync(pathname);
    const res = [];

    let direntry;

    // eslint-disable-next-line no-cond-assign
    while ((direntry = dir.readSync()) !== null) {
        if (direntry.isFile() && direntry.name.endsWith('.md')) {
            const mdContent = readFileSync(join(pathname, direntry.name), { encoding: 'utf-8' });

            const slugMatch = mdContent.match(/^slug: (.*)$/m);
            if (slugMatch) {
                res.push(slugMatch[1]);
            }
        }

        if (direntry.isDirectory()) {
            const dirPath = join(pathname, direntry.name);
            const dirRes = collectSlugs(dirPath);
            res.push(...dirRes);
        }
    }

    dir.closeSync();

    return res;
}

module.exports = {
    collectSlugs,
};


================================================
File: /tools/utils/externalLink.js
================================================
const { parse } = require('url');

const visit = import('unist-util-visit').then((m) => m.visit);

const internalUrls = ['sdk.apify.com'];

/**
 * @param {import('url').UrlWithStringQuery} href
 */
function isInternal(href) {
    return internalUrls.some(
        (internalUrl) => href.host === internalUrl
            || (!href.protocol && !href.host && (href.pathname || href.hash)),
    );
}

/**
 * @type {import('unified').Plugin}
 */
exports.externalLinkProcessor = () => {
    return async (tree) => {
        (await visit)(tree, 'element', (node) => {
            if (
                node.tagName === 'a'
                && node.properties
                && typeof node.properties.href === 'string'
            ) {
                const href = parse(node.properties.href);

                if (!isInternal(href)) {
                    node.properties.target = '_blank';
                    node.properties.rel = 'noopener';
                } else {
                    node.properties.target = null;
                    node.properties.rel = null;
                }
            }
        });
    };
};


================================================
File: /_typos.toml
================================================
[default]
extend-ignore-re = [
    '`[^`\n]+`',  # skip inline code
    '```[\s\S]*?```',  # skip code blocks
    'Bún bò Nam Bô',  # otherwise "Nam" is considered as a typo of "Name"
]

[default.extend-words]
SER = "SER"

[files]
extend-exclude = ['sources/api/*.mdx']


================================================
File: /package.json
================================================
{
    "name": "apify-docs",
    "version": "2.0.0",
    "description": "This is a home of Apify documentation.",
    "repository": {
        "type": "git",
        "url": "git+https://github.com/apify/apify-docs.git"
    },
    "keywords": [
        "documentation",
        "apify"
    ],
    "license": "Apache-2.0",
    "bugs": {
        "url": "https://github.com/apify/apify-docs/issues"
    },
    "homepage": "https://github.com/apify/apify-docs#readme",
    "scripts": {
        "start": "npm run api:rebuild && rimraf .docusaurus && cross-env LOCALHOST=1 CRAWLEE_DOCS_FAST=1 docusaurus start",
        "start:dev": "npm run api:rebuild && rimraf .docusaurus && cross-env DEV=1 CRAWLEE_DOCS_FAST=1 docusaurus start",
        "build": "npm run api:rebuild && rimraf .docusaurus && docusaurus build",
        "api:generate": "npm run redoc:build && docusaurus gen-api-docs all",
        "api:clean": "docusaurus clean-api-docs all",
        "api:rebuild": "npm run api:clean && npm run api:generate",
        "redoc:start": "redocly preview-docs",
        "redoc:build": "redocly bundle -o apify-api",
        "redoc:test": "redocly lint && npm run redoc:build",
        "redoc:test2": "redocly lint && npm run redoc:build && bin/schemathesis",
        "write-translations": "docusaurus write-translations",
        "version": "docusaurus version",
        "rename-version": "docusaurus rename-version",
        "swizzle": "docusaurus swizzle",
        "docusaurus": "docusaurus",
        "lint": "npm run lint:md && npm run lint:code",
        "lint:fix": "npm run lint:md:fix && npm run lint:code:fix",
        "lint:md": "markdownlint '**/*.md'",
        "lint:md:fix": "markdownlint '**/*.md' --fix",
        "lint:code": "eslint .",
        "lint:code:fix": "eslint . --fix",
        "postinstall": "patch-package"
    },
    "devDependencies": {
        "@apify/eslint-config-ts": "^0.4.1",
        "@apify/tsconfig": "^0.1.0",
        "@rsbuild/plugin-styled-components": "^1.1.0",
        "@types/react": "^18.2.8",
        "@typescript-eslint/eslint-plugin": "^7.0.0",
        "@typescript-eslint/parser": "^7.0.0",
        "babel-plugin-styled-components": "^2.1.4",
        "cross-env": "^7.0.3",
        "eslint": "^8.46.0",
        "eslint-plugin-json": "^3.1.0",
        "eslint-plugin-markdown": "^3.0.1",
        "eslint-plugin-react": "^7.33.1",
        "eslint-plugin-react-hooks": "^4.6.0",
        "fs-extra": "^11.1.1",
        "globby": "^14.0.0",
        "markdownlint": "^0.37.0",
        "markdownlint-cli": "^0.43.0",
        "path-browserify": "^1.0.1",
        "patch-package": "^8.0.0",
        "rimraf": "^6.0.0",
        "typescript": "^5.1.3"
    },
    "dependencies": {
        "@apify-packages/ui-library": "^0.28.1",
        "@apify/docsearch-apify-docs": "3.5.3",
        "@docusaurus/core": "3.6.3",
        "@docusaurus/faster": "3.6.3",
        "@docusaurus/plugin-client-redirects": "3.6.3",
        "@docusaurus/plugin-content-docs": "3.6.3",
        "@docusaurus/preset-classic": "3.6.3",
        "@docusaurus/theme-common": "3.6.3",
        "@docusaurus/theme-mermaid": "3.6.3",
        "@docusaurus/utils": "3.6.3",
        "@giscus/react": "^3.0.0",
        "@mdx-js/react": "^3.0.1",
        "@redocly/cli": "1.25.14",
        "ajv": "^8.17.1",
        "clsx": "^2.0.0",
        "docusaurus-plugin-openapi-docs": "0.0.0-961",
        "docusaurus-theme-openapi-docs": "0.0.0-961",
        "form-data": "^4.0.0",
        "github-buttons": "^2.28.0",
        "postcss-preset-env": "^9.3.0",
        "prism-react-renderer": "^2.4.0",
        "prop-types": "^15.8.1",
        "proxy-from-env": "^1.1.0",
        "raw-loader": "^4.0.2",
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-github-btn": "^1.4.0",
        "redocusaurus": "^2.1.1",
        "search-insights": "2.17.3",
        "styled-components": "6.1.13",
        "unist-util-visit": "^5.0.0"
    },
    "browserslist": {
        "production": [
            ">0.5%",
            "not dead",
            "not op_mini all"
        ],
        "development": [
            "last 3 chrome version",
            "last 3 firefox version",
            "last 5 safari version"
        ]
    },
    "workspaces": [
        "apify-docs-theme"
    ],
    "engines": {
        "node": ">=18.0.0"
    },
    "packageManager": "npm@10.9.2"
}


================================================
File: /.nvmrc
================================================
22


================================================
File: /apify-api/docs/index.html
================================================
<!DOCTYPE html>
<html>
  <head>
    <title>API Reference | ReDoc</title>
    <!-- needed for adaptive design -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" href="favicon.png">

    <!--
    ReDoc uses font options from the parent element
    So override default browser styles
    -->
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
    {{{redocHead}}}
  </head>
  <body>
    {{{redocHTML}}}
  </body>
</html>


================================================
File: /apify-api/plugins/decorators/code-samples-decorator.js
================================================
const { existsSync } = require('fs');
const path = require('path');

const X_CODE_SAMPLES_PROPERTY = 'x-codeSamples';

const LANGUAGES = [
    { lang: 'JavaScript', label: 'JS client' },
];

/**
 * This decorator adds the x-codeSamples property to the schema object if a file with the operationId exists in the
 * code samples directory.
 * This helps us add the samples in a consistent way and find out which operations are missing a sample.
 *
 * The added sample link will look like this:
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS client
 *     source:
 *        $ref: ../../code_samples/js/acts_post.js
 */
function CodeSamplesDecorator(target) {
    if (!target.operationId) return;

    const codeSamples = [];

    // For some reason, the operationId for resurrect run is PostResurrectRun,
    // so we change it here to keep the file names consistent
    const operationId = target.operationId === 'PostResurrectRun' ? 'actorRun_resurrect_post' : target.operationId;

    for (const { lang, label } of LANGUAGES) {
        const codeSamplePath = path.join(__dirname, `../../openapi/code_samples/${lang.toLowerCase()}/${operationId}.js`);

        if (!existsSync(codeSamplePath)) {
            // Just use this console log in development to see which operations are missing a code sample.
            // console.log(`Missing code sample for operation ${target.operationId}`);
            return;
        }

        codeSamples.push({
            lang,
            label,
            source: {
                $ref: codeSamplePath,
            },
        });
    }

    if (codeSamples.length) {
        target[X_CODE_SAMPLES_PROPERTY] = codeSamples;
    }
}

module.exports = () => ({
    // Redocly is using a visitor pattern. What the following code does is that whenever the traverser leaves a node of
    // type Tag or Operation, it executes CodeSamplesDecorator on it.
    Tag: {
        leave: CodeSamplesDecorator,
    },
    Operation: {
        leave: CodeSamplesDecorator,
    },
});


================================================
File: /apify-api/plugins/decorators/client-references-links-decorator.js
================================================
const X_PY_DOC_URLS_PROPERTY = 'x-py-doc-url';
const X_JS_DOC_URLS_PROPERTY = 'x-js-doc-url';

/**
 * This decorator adds links to the Apify API Client libraries Python and JS references.
 *
 * The Apify API OpenAPI specification has been enriched with Apify specific vendor extensions
 * on `operation` and `tag` level to link the Apify Client functionality e.g. for `actorBuild_get`:
 * ```
 * x-js-parent: BuildClient
 * x-js-name: get
 * x-js-doc-url: https://docs.apify.com/api/client/js/reference/class/BuildClient#get
 * x-py-parent: BuildClientAsync
 * x-py-name: get
 * x-py-doc-url: https://docs.apify.com/api/client/python/reference/class/BuildClientAsync#get
 * ```
 *
 * The prepended HTML example:
 * ```
 * <span style="float: right;">
 *   <a href="https://docs.apify.com/api/client/python/reference/class/BuildClientAsync#abort" target="_blank" rel="noopener noreferrer">
 *     Python doc
 *   </a>
 *   &nbsp;|&nbsp;
 *   <a href="https://docs.apify.com/api/client/js/reference/class/BuildClient#abort" target="_blank" rel="noopener noreferrer">
 *     JS doc
 *   </a>
 * </span>
 *
 * TODO: The HTML/CSS above will be subject of further design development, placeholder for now.
 * ```
 */
function ClientReferencesLinksDecorator(target) {
    const pyLink = target[X_PY_DOC_URLS_PROPERTY];
    const jsLink = target[X_JS_DOC_URLS_PROPERTY];

    const jsImgUrl = 'https://raw.githubusercontent.com/apify/openapi/b1206ac2adf8f39b05e5a09bf32c2802af58d851/assets/javascript.svg';
    const pyImgUrl = 'https://raw.githubusercontent.com/apify/openapi/b1206ac2adf8f39b05e5a09bf32c2802af58d851/assets/python.svg';

    const jsAlt = 'Apify API JavaScript Client Reference';
    const pyAlt = 'Apify API Python Client Reference';

    // Purposely using `span` element here instead of `div`
    // Due to how redoc works, when `div` used, the markdown rendering in of `description` ceased to work.
    let prepend = `<span class="openapi-clients-box">`;

    if (pyLink || jsLink) {
        prepend += `<span class="openapi-clients-box-heading">Clients</span>`;
    }

    if (pyLink) {
        prepend += `<a href="${pyLink}" target="_blank"><img src="${pyImgUrl}" class="openapi-clients-box-icon" alt="${pyAlt}"/></a>`;
    }

    if (jsLink) {
        prepend += `<a href="${jsLink}" target="_blank"><img src="${jsImgUrl}" class="openapi-clients-box-icon" alt="${jsAlt}" /></a>`;
    }

    prepend += `</span>`;

    target.description = `${prepend}${target.description || ''}`;
}

module.exports = () => ({
    // Redocly is using a visitor pattern. What the following code does is that whenever the traverser leaves a node of
    // type Tag or Operation, it executes prependLegacyUrlAnchor on it.
    Tag: {
        leave: ClientReferencesLinksDecorator,
    },
    Operation: {
        leave: ClientReferencesLinksDecorator,
    },
});


================================================
File: /apify-api/plugins/decorators/legacy-doc-url-decorator.js
================================================
const X_LEGACY_DOC_URLS_PROPERTY = 'x-legacy-doc-urls';

/**
 * The decorator prepends HTML anchors to the description of each operation with HTML fragments leading to related
 * legacy documentation pages. This achieves link backward compatibility.
 *
 * For example, if the old URL is https://docs.apify.com/api/v2#/reference/logs/log/get-log, then we prepend:
 *   <span id="/reference/logs/log/get-log"></span>
 *
 * The legacy URLs are stored on a custom property `x-legacy-doc-urls` in the node object (typically an operation
 * or tag). Multiple URLs per node are supported (we might point multiple URLs to the same tag or operation).
 */
function prependLegacyUrlAnchor(target) {
    if (X_LEGACY_DOC_URLS_PROPERTY in target) {
        const debugId = target.operationId || target.name || target.summary;

        if (!Array.isArray(target[X_LEGACY_DOC_URLS_PROPERTY])) {
            console.warn(`Invalid legacy doc URL on ${debugId}. Expected non-empty array`);
            return;
        }

        const anchors = target[X_LEGACY_DOC_URLS_PROPERTY]
            .map((url) => {
                const [, fragment] = url.split('#');

                if (!fragment) {
                    console.warn(`Invalid legacy doc URL on ${debugId}, the URL fragment part (#) is missing: ${url}`);
                }

                return fragment;
            })
            .filter((fragment) => fragment)
            .map((fragment) => `<span id="${fragment}"></span>`)
            .join('');

        target.description = `${anchors}${target.description || ''}`;
    }
}

module.exports = () => ({
    // Redocly is using a visitor pattern. What the following code does is that whenever the traverser leaves a node of
    // type Tag or Operation, it executes prependLegacyUrlAnchor on it.
    Tag: {
        leave: prependLegacyUrlAnchor,
    },
    Operation: {
        leave: prependLegacyUrlAnchor,
    },
});


================================================
File: /apify-api/plugins/apify.js
================================================
const ClientReferencesLinksDecorator = require('./decorators/client-references-links-decorator');
const CodeSamplesDecorator = require('./decorators/code-samples-decorator');
const LegacyDocUrlDecorator = require('./decorators/legacy-doc-url-decorator');

module.exports = {
    id: 'apify',
    decorators: {
        oas3: {
            'legacy-doc-url-decorator': LegacyDocUrlDecorator,
            'client-references-links-decorator': ClientReferencesLinksDecorator,
            'code-samples-decorator': CodeSamplesDecorator,
        },
    },
};


================================================
File: /apify-api/openapi/paths/actor-builds/actor-builds@{buildId}@abort.yaml
================================================
post:
  tags:
    - Actor builds/Abort build
  summary: Abort build
  description: |
    Aborts an 