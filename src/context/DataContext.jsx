import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { createContext, useState } from "react";
import { db, storage } from "../lib/firebase";
import { deleteObject, ref } from "firebase/storage";
import useUiContext from "../hooks/useUiContext";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const { setLoading } = useUiContext();
  // gets from db
  const fetchBooks = async () => {
    setLoading(true);
    await getDocs(collection(db, "books")).then((data) => {
      const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBooks(newData);
      setLoading(false);
    });
  };
  // deleting data from db
  const deleteBook = async (coverPage, id) => {
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
    const docRef = doc(db, "books", id);
    if (coverPage !== undefined) {
      try {
        console.log(fileRef);
        deleteObject(fileRef)
          .then(() => {
            deleteDoc(docRef);
            fetchBooks();
          })
          .catch((error) => {
            if (error.code == "storage/object-not-found") {
              deleteDoc(docRef);
              fetchBooks();
            } else {
              console.error(error);
            }
          });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        deleteDoc(docRef).then(() => {
          console.log("deleted");
          fetchBooks();
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <DataContext.Provider value={{ books, fetchBooks, deleteBook }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
