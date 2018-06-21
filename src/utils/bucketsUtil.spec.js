import React from 'react';
import { getOtherResources } from './bucketsUtil';

describe('test the bucket utils function', () => {
    let data = {
        'bucket1': {
            'resource1': {
                originalBucketId: 'bucket2'
            }
        },
        'bucket2': {
            'resource2': {
                originalBucketId: 'bucket2'
            }
        },
        'bucket3': {
            'resource3': {
                originalBucketId: 'bucket3'
            }
        }

    }

    it('should return the resource in another bucket', () => {
        let expected = [{
            resource: {
                originalBucketId: 'bucket2'
            },
            bucketKey: 'bucket1'
        }]
        let actual = getOtherResources(data, 'bucket2');
        expect(actual).toEqual(expected);
    })
})