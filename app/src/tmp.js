const selectionSort = () => {
  const newData = [...data];
  let labels = Array.from({ length: numElements }, (_, i) =>
    (i + 1).toString()
  );
  let colors = generateColors(numElements);
  let timeout = 0;

  for (let i = 0; i < newData.length - 1; i++) {
    let minIndex = i;

    // Find the minimum element in the unsorted part of the array
    for (let j = i + 1; j < newData.length; j++) {
      setNumCheck((prevNumCheck) => prevNumCheck + 1);
      if (newData[j] < newData[minIndex]) {
        minIndex = j;
      }
    }

    // Swap the found minimum element with the first element of the unsorted part
    if (minIndex !== i) {
      setNumSwap((prevNumSwap) => prevNumSwap + 1);
      swap(newData, i, minIndex);
      swap(labels, i, minIndex);
      swap(colors, i, minIndex);

      timeout += 500 / searchSpeedMultiplier;
      updateChartDelayed(
        labels.slice(),
        newData.slice(),
        colors.slice(),
        timeout
      );
    }
  }

  if (searchTimeoutRef.current) {
    clearTimeout(searchTimeoutRef.current);
  }
};

const swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
