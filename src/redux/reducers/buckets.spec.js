import React from 'react';
import { buckets } from './buckets';

describe('Testing the buckets reducer', () => {
    let initState = {"1": {id: "1", name: "bucket1", resources: [1, 2, 3, 4, 5, 6]}};
    it('reorders the buckets successfully', () => {
        let action = {
            type: 'BUCKET_REORDER',
            data: {
                bucketId: "1",
                sourceIdx: 2,
                destIdx: 3
            }
        }

        let actual = buckets(initState, action);
        let expectedState = {"1": {id: "1", name: "bucket1", resources: [1, 2, 4, 3, 5, 6]}};
        expect(actual).toEqual(expectedState);
    })
})