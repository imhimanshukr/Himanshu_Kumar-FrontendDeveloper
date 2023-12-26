import { useEffect, useState } from "react";
import logo from "../assets/logo.avif";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCapsuleList } from "../store/capsuleSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import noDataFound from "../assets/no-data-found.png";

const Capsules = () => {
  const dispatch = useDispatch();
  let originalCapsules = useSelector((state) => state?.capsuleList) || [];
  const status = useSelector((state) => state?.status) || [];
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredCapsuleList, setFilteredCapsuleList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [originalLaunch, setOriginalLaunch] = useState("");
  const [type, setType] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState(null);

  const capsulesPerPage = 10;

  useEffect(() => {
    setFilteredCapsuleList(originalCapsules);
  }, [originalCapsules]);

  useEffect(() => {
    dispatch(getCapsuleList());
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const offset = currentPage * capsulesPerPage;
  const currentCapsules = filteredCapsuleList.slice(
    offset,
    offset + capsulesPerPage
  );

  const searchByStatus = (e) => {
    setIsSearched(true);
    const selectedStatus = e.target.value;
    setSelectedStatus(selectedStatus);
    const filteredCapsule = originalCapsules.filter(
      (capsule) => capsule.status == selectedStatus
    );
    setFilteredCapsuleList(filteredCapsule);
  };

  const searchCapsule = () => {
    setIsSearched(true);
    setCurrentPage(0);
    const filteredCapsule = originalCapsules.filter((capsule) => {
      const capsuleDate = new Date(capsule.original_launch).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "2-digit", day: "2-digit" }
      );

      const selectedDate = new Date(originalLaunch).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "2-digit", day: "2-digit" }
      );

      return (
        (!selectedStatus || capsule.status === selectedStatus) &&
        (!originalLaunch || capsuleDate === selectedDate) &&
        (!type || capsule.type === type)
      );
    });

    if (filteredCapsule.length > 0) {
      setFilteredCapsuleList(filteredCapsule);
    } else {
      setFilteredCapsuleList([]);
    }
  };

  const resetSearch = () => {
    setIsSearched(false);
    setSelectedStatus("");
    setOriginalLaunch("");
    setType("");
    setFilteredCapsuleList(originalCapsules);
    setCurrentPage(0);
  };
  
  const handleCapsuleClick = (capsule) => {
    setSelectedCapsule(capsule);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Search */}
      <div className="mx-auto md:px-14 px-2 py-4 bg-white">
        <h2 className="text-2xl font-semibold mb-4">Search Capsules</h2>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 items-center">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="p-2 capitalize block w-full border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
              onChange={searchByStatus}
              value={selectedStatus}
            >
              <option value="" disabled>
                Select
              </option>
              {status.map((status) => (
                <option className="capitalize" key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Original Launch
            </label>
            <DatePicker
              selected={originalLaunch ? new Date(originalLaunch) : null}
              onChange={(date) => setOriginalLaunch(date)}
              dateFormat="MMMM d, yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              className="p-2 block w-full border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
              placeholderText="Select original launch date"
            />
          </div>{" "}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Type
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-2 block w-full border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter type"
            />
          </div>
          <button
            onClick={searchCapsule}
            className="bg-gray-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mt-3"
          >
            Search
          </button>
          <button
            onClick={resetSearch}
            className="bg-gray-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 mt-3"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Capsule Card  */}
      <div className="grid md:grid-cols-4 grid-cols-1 md:gap-6 gap-2 md:px-14 px-2 bg-white">
        {currentCapsules.length === 0 && isSearched ? (
          <div className="flex justify-center items-center h-full col-span-4">
            <img src={noDataFound} alt="No Data Found" />
          </div>
        ) : (
          currentCapsules.map((capsule) => (
            <div
              key={capsule.capsule_serial}
              className="rounded-md border shadow-md p-4 mb-4 cursor-pointer"
              onClick={() => handleCapsuleClick(capsule)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-2">
                  {capsule.capsule_serial}
                </h2>
                <img src={logo} alt="" width="45px" />
              </div>
              <p className="text-gray-600 text-sm mb-2 font-semibold capitalize">{capsule.status}</p>
              <p className="text-gray-700 mb-4 font-semibold ">{capsule.details}</p>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-xs font-semibold ">
                  {formatDate(capsule.original_launch)}
                </p>
                <p className="text-gray-600 text-xs font-semibold ">{capsule.type}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center p-4 pagination-box">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(filteredCapsuleList.length / capsulesPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal">
            <div className="modal-header">
              <h2 className="font-bold">{selectedCapsule?.capsule_serial}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-red-900">Close</button>
            </div>
            <div className="modal-content">
              <p className="capitalize"><span className="font-semibold">Status:</span> {selectedCapsule?.status}</p>
              <p><span className="font-semibold">Details:</span> {selectedCapsule?.details}</p>
              <p><span className="font-semibold">original Launch:</span> {formatDate(selectedCapsule?.original_launch)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Capsules;
