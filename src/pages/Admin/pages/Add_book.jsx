import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import FormAlert from "../../../components/FormAlert";
import Loading from "../../../components/Loading";
import useDataProvider from "../../../hooks/useDataProvider";
import useFormProvider from "../../../hooks/useFormProvider";
import useUiContext from "../../../hooks/useUiContext";
import { db, storage } from "../../../lib/firebase";
const Add_book = ({ edit }) => {
  // variables
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, setLoading } = useUiContext();
  const url = useRef();
  const changing = useRef(false);
  const [input, setinput] = useState({
    book_name: "",
    author: [],
    pages: "",
    category: [],
    book_description: "",
  });
  const { fetchBooks, delete_image, getBook, book } = useDataProvider();
  const [file, setFile] = useState(false);
  const inputStyling = [`w-full border  rounded-lg px-2 py-3`];
  // functions
  const { handleAlert, error, message, setError, isVisible } =
    useFormProvider();

  // one gets the books from database and the second set the values to be displayed

  useEffect(() => {
    if (edit) {
      setLoading(true);
      getBook(id);
      setLoading(false);
    }
  }, [id, edit, setLoading, getBook]);
  const setValues = useCallback(() => setinput(book), [book]);

  useEffect(() => {
    if (edit && !changing.current) {
      setImage(book.cover_page);
      setValues();
    }
  }, [edit, book, file, setValues, changing]);

  // dealing with the image data
  const handleFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadImage(e.target.files[0]);
      setFile(true);
      return setImage(URL.createObjectURL(e.target.files[0]));
    } else {
      return setFile(false);
    }
  };

  // dealing with input changes
  const handleChange = (e) => {
    const arrayvalue = (value) => {
      let final = [];
      value = value.split(",");
      value.forEach((item) => {
        final.push(item.toLowerCase());
      });
      return final;
    };
    if ([e.target.name] == "category" || [e.target.name] == "author") {
      const value = arrayvalue(e.target.value);
      setinput((input) => ({
        ...input,
        [e.target.name]: value,
      }));
    } else {
      setinput((input) => ({
        ...input,
        [e.target.name]: e.target.value,
      }));
    }
    changing.current = true;
  };

  // validating data
  const validateInput = () => {
    const validating = Object.values(input);
    validating.forEach((value) => {
      if (value.length == 0) {
        setError(true);
        handleAlert("Missing fields");
        return false;
      } else {
        return true;
      }
    });
  };

  // adding books
  const addingBooks = async (input) => {
    const data = await addDoc(collection(db, "books"), input);
    console.log("book");
    return data;
  };

  // uploading files to database
  const upload_file = async () => {
    setLoading(true);
    // checking if authors is in database
    try {
      const bookCoverRef = ref(storage, "books/" + uploadImage.name);
      const uploadTask = await uploadBytesResumable(
        bookCoverRef,
        uploadImage
      ).then((snapshot) => {
        // this fetches the uploaded image from the database
        getDownloadURL(snapshot.ref).then((downloadUrl) => {
          // and sets it to the text data
          url.current = true;
          if (edit) {
            setinput((data) => ({
              ...data,
              cover_page: downloadUrl,
              updatedAt: serverTimestamp(),
            }));
          } else {
            setinput((data) => ({
              ...data,
              cover_page: downloadUrl,
              createdAt: serverTimestamp(),
            }));
          }
        });
      });
      return uploadTask;
    } catch (error) {
      console.log(error);
    }
  };
  // updating book to the database
  const updateBook = useCallback(
    async (input) => {
      const bookUpdate = doc(db, "books", id);
      const updating = await updateDoc(bookUpdate, input);
      return updating;
    },
    [id]
  );
  // this will run after the image has been uploaded
  useEffect(() => {
    if (url.current && !edit) {
      addingBooks(input);
      setLoading(false);
      setError(false);
      handleAlert("successfully added");
      url.current = false;
      fetchBooks();
    } else if (edit && url.current) {
      updateBook(input);
      setLoading(false);
      setError(false);
      handleAlert("successfully Updated");
      url.current = false;
      fetchBooks();
    }
  }, [
    url,
    input,
    fetchBooks,
    setLoading,
    edit,
    updateBook,
    handleAlert,
    setError,
  ]);

  // dealing with the click button
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (validateInput) {
      try {
        await upload_file();
      } catch (error) {
        console.log(error);
      }
    } else {
      setLoading(false);
    }
  };
  // edit functions
  const handleEdit = async () => {
    // this is meant to avoid repetition

    // when file changes
    if (file) {
      // it will check whether the image url is empty or not
      if (book.cover_page !== undefined || book.cover_page !== null) {
        // if it is not empty it will delete the existing file from the database
        delete_image(input.cover_page)
          .then(() => {
            // uploads and update the database
            upload_file();
            setError(false);
            handleAlert("Success");
          })
          .catch((error) => {
            // in the case where the file being deleted is not found it will just upload the selected file
            if (error.code == "storage/object-not-found") {
              upload_file();
              setError(false);
              handleAlert("success");
            } else {
              console.error(error);
            }
          });
      } else {
        upload_file();
        handleAlert("Success");
      }
    } else {
      setLoading(true);
      console.log(input);
      updateBook(input);
      fetchBooks();
      setLoading(false);
      handleAlert("Success");
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="p-4">
          <div className="flex gap-3 ">
            <button
              className="text-xl text-slate-600 "
              onClick={() => navigate(-1)}
            >
              <BiArrowBack />
            </button>
            <div className="font-semibold text-xl">Add book</div>
          </div>
          <FormAlert error={error} message={message} isVisible={isVisible} />
          <div>
            <div className="my-4">
              <label>Enter cover page image</label>
              {image && <img alt="book cover preview" src={image} />}
              <input
                type="file"
                name="cover_image"
                onChange={handleFile}
                accept="image/*"
                className="file:px-3 file:py-2 file:bg-theme-color2 file:text-white file:font-semibold file:rounded-full file:border-0 file:shadow-md py-5"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <div className="w-full">
                <label>Book name</label>
                <input
                  onChange={handleChange}
                  value={input.book_name}
                  type="text"
                  name="book_name"
                  placeholder="Book name "
                  className={inputStyling}
                />
              </div>
              <div className="w-full">
                <label>Author</label>
                <input
                  onChange={handleChange}
                  type="text"
                  value={input.author}
                  name="author"
                  id=""
                  className={inputStyling}
                  placeholder="Author name"
                />
              </div>
              <div className="w-full">
                <label>Pages</label>
                <input
                  onChange={handleChange}
                  value={input.pages}
                  type="number"
                  name="pages"
                  id=""
                  placeholder="Number of pages"
                  className={inputStyling}
                />
              </div>
              <div className="w-full">
                <label>Categories</label>
                <input
                  onChange={handleChange}
                  value={input.category}
                  type="search"
                  name="category"
                  placeholder="category"
                  className={inputStyling}
                  id=""
                />
              </div>
              <div className="w-full">
                <label>Description</label>
                <textarea
                  value={input.book_description}
                  onChange={handleChange}
                  name="book_description"
                  id=""
                  rows={4}
                  placeholder="Book description"
                  className={inputStyling}
                />
              </div>
              <div className="w-full flex justify-end">
                <button
                  onClick={edit ? handleEdit : handleClick}
                  className="bg-theme-color1 text-white py-2 w-fit px-4 rounded-xl font-bold"
                >
                  {edit ? "Edit" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Add_book;
