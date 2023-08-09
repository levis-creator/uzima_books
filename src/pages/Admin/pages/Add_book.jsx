import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import ErrorAlert from "../../../components/ErrorAlert";
import useFormProvider from "../../../hooks/useFormProvider";
import { db, storage } from "../../../lib/firebase";
import { useNavigate, useParams } from "react-router-dom";
import useDataProvider from "../../../hooks/useDataProvider";
import useUiContext from "../../../hooks/useUiContext";
import Loading from "../../../components/Loading";
const Add_book = ({ edit }) => {
  // variables
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, setLoading } = useUiContext();
  const [input, setinput] = useState({
    book_name: "",
    author: "",
    pages: "",
    category: [],
    book_description: "",
  });
  const { fetchBooks } = useDataProvider();
  const inputStyling = [`w-full border  rounded-lg px-2 py-3`];
  // functions
  const { handleError, error, message } = useFormProvider();
  // dealing with the image data
  const handleFile = useCallback(
    (e) => {
      if (e.target.files && e.target.files[0]) {
        setUploadImage(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
      } else {
        return false;
      }
    },
    [setUploadImage, setImage]
  );
  // dealing with input changes
  const handleChange = useCallback(
    (e) => {
      setinput((input) => ({ ...input, [e.target.name]: e.target.value }));
    },
    [setinput]
  );
  // validating data
  const validateInput = () => {
    const validating = Object.values(input);
    validating.forEach((value) => {
      if (value.length == 0) {
        return handleError("Missing fields");
      } else {
        return true;
      }
    });
  };
  // dealing with the click button

  // adding books
  const addingBooks = async () => {
    const data = await addDoc(collection(db, "books"), input);
    return data;
  };
  // uploading files to database
  const upload_file = async () => {
    // checking if authors is in database
    try {
      const bookCoverRef = ref(storage, "books/" + uploadImage.name);
      const uploadTask = uploadBytesResumable(bookCoverRef, uploadImage);
      uploadTask.then((snapshot) => {
        // this fetches the uploaded image from the database
        getDownloadURL(snapshot.ref).then((downloadUrl) => {
          // and sets it to the text data
          setinput((data) => ({ ...data, cover_page: downloadUrl }));
          addingBooks();
          console.log("success");
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (validateInput) {
      await upload_file();
      fetchBooks();
    }
    console.log(input);
  };
  const setValues = useCallback(
    () =>
      setinput({
        book_name: data.book_name,
        category: data.category,
        pages: data.pages,
        book_description: data.book_description,
        author: data.author,
      }),
    [data]
  );
  // edit functions

  const getBook = useCallback(async () => {
    const docData = await getDoc(doc(db, "books", id));
    if (docData.exists()) {
      setData(docData.data());
      setLoading(false);
      return setData((data) => ({ ...data, id: docData.id }));
    } else {
      return navigate("/all-books");
    }
  }, [id, navigate, setLoading]);
  // to avoid infinite rerender i have create  two different useEffect
  // one gets the books from database and the second set the values to be displayed

  useEffect(() => {
    if (edit) {
      setLoading(true);
      getBook();
    }
  }, [getBook, edit, setLoading]);
  useEffect(() => {
    if (edit) {
      // getBook();
      setImage(data.cover_page);
      setValues();
    }
  }, [edit, data.cover_page, setValues]);
  // handling edit
  const handleEdit = async () => {
    const bookUpdate = doc(db, "books", id);
    await updateDoc(bookUpdate, input);
    if (handleFile) {
      upload_file();
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
          <ErrorAlert error={error} message={message} />
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
