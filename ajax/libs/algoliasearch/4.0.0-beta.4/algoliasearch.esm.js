import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import { createAnalyticsClient, addABTest, getABTest, getABTests, stopABTest, deleteABTest } from '@algolia/client-analytics';
import { version } from '@algolia/client-common';
import { createSearchClient, multipleQueries, multipleSearchForFacetValues, multipleBatch, multipleGetObjects, copyIndex, copySettings, copySynonyms, moveIndex, getPersonalizationStrategy, setPersonalizationStrategy, listIndices, getLogs, listClusters, getApiKey, addApiKey, listApiKeys, updateApiKey, deleteApiKey, restoreApiKey, initIndex, batch, deleteIndex, getObject, getObjects, saveObject, saveObjects, search, searchForFacetValues, waitTask, setSettings, getSettings, partialUpdateObject, partialUpdateObjects, deleteObject, deleteObjects, deleteBy, clearObjects, browseObjects, getObjectPosition, findObject, exists, saveSynonym, saveSynonyms, getSynonym, searchSynonyms, browseSynonyms, deleteSynonym, clearSynonyms, replaceAllObjects, replaceAllSynonyms, searchRules, getRule, deleteRule, saveRule, saveRules, replaceAllRules, browseRules, clearRules } from '@algolia/client-search';
import { LogLevelEnum } from '@algolia/logger-common';
import { createConsoleLogger } from '@algolia/logger-console';
import { createBrowserXhrRequester } from '@algolia/requester-browser-xhr';
import { createUserAgent } from '@algolia/transporter';

function algoliasearch(appId, apiKey, options = {}) {
    const logger = createConsoleLogger(options.logLevel || LogLevelEnum.Error);
    const clientOptions = {
        appId,
        apiKey,
        timeouts: {
            read: 1,
            write: 30,
        },
        requester: createBrowserXhrRequester(),
        logger,
        responsesCache: createInMemoryCache(),
        requestsCache: createInMemoryCache(),
        hostsCache: createBrowserLocalStorageCache(version, logger),
        userAgent: createUserAgent(version).add({ segment: 'Browser' }),
    };
    return createSearchClient({
        ...clientOptions,
        methods: {
            search: multipleQueries,
            searchForFacetValues: multipleSearchForFacetValues,
            multipleBatch,
            multipleGetObjects,
            multipleQueries,
            copyIndex,
            copySettings,
            copySynonyms,
            moveIndex,
            getPersonalizationStrategy,
            setPersonalizationStrategy,
            listIndices,
            getLogs,
            listClusters,
            multipleSearchForFacetValues,
            getApiKey,
            addApiKey,
            listApiKeys,
            updateApiKey,
            deleteApiKey,
            restoreApiKey,
            initIndex: base => (indexName) => {
                return initIndex(base)(indexName, {
                    methods: {
                        batch,
                        delete: deleteIndex,
                        getObject,
                        getObjects,
                        saveObject,
                        saveObjects,
                        search,
                        searchForFacetValues,
                        waitTask,
                        setSettings,
                        getSettings,
                        partialUpdateObject,
                        partialUpdateObjects,
                        deleteObject,
                        deleteObjects,
                        deleteBy,
                        clearObjects,
                        browseObjects,
                        getObjectPosition,
                        findObject,
                        exists,
                        saveSynonym,
                        saveSynonyms,
                        getSynonym,
                        searchSynonyms,
                        browseSynonyms,
                        deleteSynonym,
                        clearSynonyms,
                        replaceAllObjects,
                        replaceAllSynonyms,
                        searchRules,
                        getRule,
                        deleteRule,
                        saveRule,
                        saveRules,
                        replaceAllRules,
                        browseRules,
                        clearRules,
                    },
                });
            },
            initAnalytics: () => (region) => {
                return createAnalyticsClient({
                    ...clientOptions,
                    region,
                    methods: {
                        addABTest,
                        getABTest,
                        getABTests,
                        stopABTest,
                        deleteABTest,
                    },
                });
            },
        },
    });
}
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, functional/immutable-data
window.algoliasearch = algoliasearch;

export default algoliasearch;
