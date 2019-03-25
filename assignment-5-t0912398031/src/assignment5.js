/**
 *@ - this is the class of assignment5
 */
export class Assignment5{


/**
 * @param {array} arr - array
 * @param {int} l - initial element
 * @param {int} r - length
 * @param {int} x - number to search 
 */
binarySearch(arr, l, r, x){ 
  if (r >= l) { 
    var mid = Math.floor(l + (r - l) / 2);
    // console.log(mid)
    
  /**
   * @return {number} element is mid then return the index of element
   */
    if (arr[mid] == x){
      return mid;
    } 

    else if (arr[mid] > x){
    /**
     * @todo element smaller than mid, search into left part
     */
      return binarySearch(arr, l, mid - 1, x);
    } 

    else{
    /**
     * @todo element larger than mid, search into left part
     */
      return binarySearch(arr, mid + 1, r, x);
    } 
  } 

 /**
   * @return {number}  element is not present in array 
   */
  return -1
} 

/**
 * @example
 * 
 */








// Reference: https://www.geeksforgeeks.org/binary-search/



/**
 * @param {array} arr - array
 */
bubbleSort(arr) {
    var l = arr.length;
    //Number of passes
    for (var i = 0; i < l; i++) { 
      //last num been checked already
      for (var j = 0; j < (l - i - 1); j++) { 
        //Swap numbers if j>j+1
        if(arr[j] > arr[j+1]) {
          var tmp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = tmp;
        }
      }        
    }
  /**
   * @return {array}  return sorted array 
   */
    return arr
  }





// Reference: https://www.geeksforgeeks.org/bubble-sort/


/**
 * @param {string} str - pass whole string to be checked
 */
palindrome(str) {
  // var re = /[^A-Za-z0-9]/g;
  // str = str.toLowerCase().replace(re, '');

/**
 * @todo \s is the regex for "whitespace", and g is the "global" flag
 */
  str = str.toLowerCase().replace(/\s+/g, ''); 
  var chars = str.split('');
  var len = str.length;
  // console.log(chars);

/**
 * @todo check corresponding item
 */
  for (var i = 0; i < len/2; i++) {
    if (str[i] !== str[len - 1 - i]) {
        return false;
    }
  }
  return true;
 }



//  Reference: https://medium.freecodecamp.org/two-ways-to-check-for-palindromes-in-javascript-64fea8191fd7



/**
 * @emits {MyEvent1} test.
 */
test(){
  const list = [1, 13, 18, 27, 34, 49, 62, 86]
/**
 * @param {function: int} lengh - get lenth of list
 */
  var n = list.length
  console.log(binarySearch(list, 0, n-1, 13)) // returns the index of the item looking for(13)


/**
 * @example
 */
  const list2 = [64, 34, 25, 12, 22, 11, 90] 
  console.log(bubbleSort(list2))

/**
 * @example
 */
 console.log(palindrome("A man a plan a canal Panama")) 
 console.log(palindrome("__''^&^''__"))
}

}