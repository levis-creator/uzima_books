import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useState } from "react";
import ErrorAlert from "../../../components/ErrorAlert";
import useFormProvider from "../../../hooks/useFormProvider";
import { db, storage } from "../../../lib/firebase";

const Add_book = () => {
  // variables
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [input, setinput] = useState({
    book_name: "",
    author: "",
    pages: "",
    category: [],
    book_description: "",
  });
  const inputStyling = [`w-full border  rounded-lg px-2 py-3`];
  // functions
  const { handleError, error, message } = useFormProvider();
  // dealing with the image data
  const handleFile = useCallback(
    (e) => {
      if (e.target.files && e.target.files[0]) {
        setUploadImage(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
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
  const validateInput = (input) => {
    const validating = Object.values(input);
    validating.forEach((value) => {
      if (value.length == 0) {
        return handleError("Missing fields");
      }
      return true;
    });
  };
  // dealing with the click button
  const checkingAuthors = async () => {
    const q = query(
      collection(db, "authors"),
      where("name", "==", input.author)
    );
    const storingData = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      storingData.push(doc.id);
    });
    if (querySnapshot.length == 0) {
      addDoc(collection(db, "authors"), {
        name: input.author,
      }).then((doc) => {
        setinput((data) => ({
          ...data,
          author: doc.id,
        }));
      });
    } else {
      setinput((data) => ({
        ...data,
        author: querySnapshot[0],
      }));
    }
  };
  // adding books
  const addingBooks = async () => {
    await addDoc(collection(db, "books"), input);
    console.log("success");
  };
  const handleClick = async (e) => {
    e.preventDefault();
    validateInput(inputStyling);
    const bookCoverRef = ref(storage, "books/" + uploadImage.name);
    const uploadTask = uploadBytesResumable(bookCoverRef, uploadImage);
    checkingAuthors();
    // checking if authors is in database
    try {
      uploadTask
        .then((snapshot) => {
          // this fetches the uploaded image from the database
          getDownloadURL(snapshot.ref).then((downloadUrl) => {
            // and sets it to the text data
            setinput((data) => ({ ...data, cover_page: downloadUrl }));
          });
        })
        .then(() => {
          addingBooks();
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="p-4">
        {console.log(input)}
        <div className="font-semibold text-xl">Add book</div>
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
                onClick={handleClick}
                className="bg-theme-color1 text-white py-2 w-fit px-4 rounded-xl font-bold"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add_book;
