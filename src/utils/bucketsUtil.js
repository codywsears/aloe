//Get resources from other buckets for a specified bucket
export function getOtherResources(resources, id) {
    let otherResources = Object.keys(resources).reduce((result, bucketKey) => {
        if (bucketKey !== id) {
            Object.keys(resources[bucketKey]).forEach(resourceKey => {
                let resource = resources[bucketKey][resourceKey];
                if (resource.originalBucketId === id) {
                    result.push({resource, bucketKey});
                }
            })
        }
        return result;
    }, []);
    return otherResources;
}