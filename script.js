let searchBox = document.querySelector(".search-box");
if (searchBox) {
  let searchList = searchBox.querySelector(".search-input__history");
  let searchHistories = searchBox.querySelectorAll(
    ".search-input__history-item"
  );
  let searchInputElement = searchBox.querySelector(".search-input__text");
  let searchRemoveBtn = searchBox.querySelector(".search-footer button");

  // Mảng chứa danh sách lịch sử tìm kiếm
  let historiesList = Array.from(searchHistories).reduce(function (
    values,
    searchHistory
  ) {
    values.push(searchHistory.textContent.trim());
    return values;
  },
  []);

  searchInputElement.onkeyup = (e) => {
    let currentInputValue = e.target.value.trim();
    if (e.key === "Enter") {
      if (
        currentInputValue !== "" &&
        historiesList.indexOf(currentInputValue) === -1
      ) {
        historiesList.push(currentInputValue);
        searchList.innerHTML =
          searchList.innerHTML +
          `
        <li class="search-input__history-item">
            ${historiesList[historiesList.length - 1]}
            <i class="fas fa-times" onclick="deleteHistory(event)"></i>
          </li>
        `;
      }
      e.target.value = "";
    }
  };

  // Event Delete History
  function deleteHistory(e) {
    historiesList.splice(
      historiesList.findIndex(
        (element) => element === e.target.parentElement.textContent.trim()
      ),
      1
    );
    e.target.parentElement.remove();
  }

  //Event Remove All History
  searchRemoveBtn.onclick = () => {
    searchList.innerHTML = "";
    historiesList.splice(0, historiesList.length);
  };
}
