import {
  collection,
  deleteDoc,
  doc,
  endAt,
  endBefore,
  getDoc,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { createContext, useState } from "react";
import useUiContext from "../hooks/useUiContext";
import { db, storage } from "../lib/firebase";
import _ from "lodash";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});
  const { setLoading } = useUiContext();
  const [recievedData, setRecievedData] = useState({});
  const [success, setSuccess] = useState(null);
  const [page, setPage] = useState(1);
  // gets from db
  const fetchBooks = async () => {
    await getDocs(collection(db, "books")).then((data) => {
      const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBooks(newData);
    });
  };
  // getting paginated data
  const paginate = async () => {
    setLoading(true);
    const q = query(collection(db, "books"), orderBy("book_name"), limit(5));
    await getDocs(q).then((data) => {
      let newData = _.map(data.docs, (doc) => ({ ...doc.data(), id: doc.id }));
      setBook(newData);
      setLoading(false);
    });
  };
  // showing next
  const showNext = ({ item }) => {
    setLoading(true);

    const fetchNext = async () => {
      const q = query(
        collection(db, "books"),
        orderBy("book_name"),
        startAfter(item.book_name),
        limit(5)
      );
      await getDocs(q).then((data) => {
        let nextData = _.map(data.docs, (doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBook(nextData);
      });
      setPage(page + 1);
      setLoading(false);
    };
    fetchNext();
  };
  // fetching previous items
  const showPrev = ({ item }) => {
    setLoading(true);
    const fetchPrev = async () => {
      const q = query(
        collection(db, "books"),
        orderBy("book_name"),
        limitToLast(5),
        endBefore(item.book_name)
      );
      await getDocs(q).then((data) => {
        let prevData = _.map(data.docs, (doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBook(prevData);
      });
      setPage(page - 1);
    };
    fetchPrev();
    setLoading(false);
  };
  // deleting Images
  const delete_image = async (coverPage) => {
    // this converts the url into file
    const removeUrl = (url) => {
      if (url != undefined) {
        let text1 = `https://firebasestorage.googleapis.com/v0/b/uzima-books.appspot.com/o/books%2F`;
        let newText = url.replace(text1, "");
        let index = newText.indexOf("?");
        var final = newText.substr(0, index);
        return final;
      }
    };
    const fileRef = ref(storage, `books/${removeUrl(coverPage)}`);
    return await deleteObject(fileRef);
  };
  // deleting data from db
  const deleteBook = async (coverPage, id) => {
    setLoading(true);
    const docRef = doc(db, "books", id);

    if (coverPage !== undefined || coverPage !== null) {
      try {
        await delete_image(coverPage).then(() => {
          deleteDoc(docRef).then(() => {
            setSuccess(true);
            fetchBooks();
          });
        });
      } catch (error) {
        if (error.code == "storage/object-not-found") {
          deleteDoc(docRef).then(() => {
            setSuccess(true);
            console.log("deleted");
            fetchBooks();
          });
        } else {
          setSuccess(false);
          console.error(error);
        }
      }

      setLoading(false);
    } else {
      try {
        deleteDoc(docRef).then(() => {
          console.log("deleted");
          setSuccess(true);
          fetchBooks();
        });
      } catch (error) {
        setSuccess(false);
        console.log(error);
        setLoading(false);
      }
    }
    setTimeout(() => {
      setSuccess(null);
    }, 2000);
  };
  // getting single book
  const getBook = async (id) => {
    const docData = await getDoc(doc(db, "books", id));
    if (docData.exists()) {
      setBook(docData.data());
      setBook((data) => ({ ...data, id: docData.id }));
      setLoading(false);
    }
  };
  return (
    <DataContext.Provider
      value={{
        books,
        book,
        fetchBooks,
        deleteBook,
        delete_image,
        recievedData,
        success,
        setRecievedData,
        getBook,
        paginate,
        showNext,
        page,
        setPage,
        showPrev,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
