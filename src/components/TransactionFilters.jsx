import "./../styles/TransactionFilters.css";

const TransactionFilters = ({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  typeFilter,
  setTypeFilter,
  sortBy,
  setSortBy,
  categories,
}) => {
  return (
    <div className="filter-card">
      <h3>Filter Transactions</h3>

      <div className="search-group">
        <label>Search</label>

        <input
          type="text"
          placeholder="Search description..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="filter-grid">
        <div>
          <label>Category</label>

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
          >
            <option value="All">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Type</label>

          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value)
            }
          >
            <option value="All">
              All Types
            </option>

            <option value="Income">
              Income
            </option>

            <option value="Expense">
              Expense
            </option>
          </select>
        </div>

        <div>
          <label>Sort</label>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="AddedNewest">
              Date Added (Newest)
            </option>

            <option value="AddedOldest">
              Date Added (Oldest)
            </option>

            <option value="TransactionNewest">
              Transaction Date (Newest)
            </option>

            <option value="TransactionOldest">
              Transaction Date (Oldest)
            </option>

            <option value="Highest">
              Highest Amount
            </option>

            <option value="Lowest">
              Lowest Amount
            </option>

            <option value="A-Z">
              Description (A-Z)
            </option>

            <option value="Z-A">
              Description (Z-A)
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;