import React from 'react';
import { reorder } from './dragAndDropUtils';

describe('Drag and Drop Utils unit tests', () => {
    let list = [1, 2, 3, 4, 5, 6];
    it('returns reordered list with start index and end index', () => {
        let result = reorder(list, 2, 3);
        let expected = [1, 2, 4, 3, 5, 6];
        expect(result).toEqual(expected);
    })
})