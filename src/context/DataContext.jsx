import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { createContext, useState } from "react";
import useUiContext from "../hooks/useUiContext";
import { db, storage } from "../lib/firebase";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});
  const { setLoading } = useUiContext();
  const [recievedData, setRecievedData] = useState({});
  const [success, setSuccess] = useState(null);
  // gets from db
  const fetchBooks = async () => {
    await getDocs(collection(db, "books")).then((data) => {
      const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBooks(newData);
    });
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
