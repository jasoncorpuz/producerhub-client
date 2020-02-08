function quickSort(arr, start = 0, end = arr.length) {
    if(start >= end) {
        return arr;
    }
    const middle = partition(arr, start, end);
    arr = quickSort(arr, start, middle);
    arr = quickSort(arr, middle + 1, end);
    return arr;
}

function partition(arr, start, end) {
    const pivot = arr[end - 1];
    let j = start; 
    for (let i = start; i < end -1; i++) {
        if(arr[i] <= pivot) {
            swap(arr, i ,j);
            j++;
        }
    }
    swap(arr, end-1, j);
    return j;
}

function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};

export default quickSort;