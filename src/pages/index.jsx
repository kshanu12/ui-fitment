import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, searchUser, selectFilteredUsers } from "@/redux/usersSlice";
import styles from "../styles/Home.module.css";
import SearchBar from "../components/searchBar.jsx";
import Table from "../components/Table.jsx";

const IndexPage = () => {
  const dispatch = useDispatch();
  const filteredUsers = useSelector(selectFilteredUsers) || [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchUser())
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching users:", error);
      });
  }, [dispatch]);

  const handleSearch = (e) => {
    if (!loading) {
      dispatch(searchUser(e.target.value));
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>User Details</div>
      <SearchBar handleSearch={handleSearch} />
      <div className={styles.tableContainer}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table users={filteredUsers} />
        )}
      </div>
    </div>
  );
};

export default IndexPage;
