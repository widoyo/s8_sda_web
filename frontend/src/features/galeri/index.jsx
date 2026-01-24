import { useEffect, useState } from "react";

import DropdownSelect from "../../components/select"; // Reusing the DropdownSelect component
import PhotoCard from "../../components/photo-card";
import { getGallery } from "../../services/gallery/api";

const GaleriPage = () => {
  const [data, setData] = useState([]);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [photoMonths, setPhotoMonths] = useState([]);

  // Function to extract unique months for the dropdown
  const getUniqueMonths = (photos) => {
    const months = photos.map((item) => {
      // Use createdAt for date
      const date = new Date(item.createdAt);

      // Check if the date is valid
      if (!isNaN(date.getTime())) {
        // Format the date to "Month Year"
        return date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
      } else {
        console.error("Invalid date encountered:", item.createdAt);
        return "Unknown Date"; // Fallback for invalid dates
      }
    });

    // Remove duplicates and return
    return Array.from(new Set(months));
  };

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await getGallery();
        // Check if the response has a data property that is an array
        if (response && Array.isArray(response.data)) {
          setData(response.data);
          setPhotoMonths(getUniqueMonths(response.data));
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Failed to fetch gallery data:", error);
      }
    };

    fetchGallery();
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Filter photos by selected month
  const filteredPhotos =
    selectedMonth === "all"
      ? data
      : data.filter((item) => {
          const itemDate = new Date(item.createdAt); // Use createdAt for filtering
          const monthYear = itemDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          });
          return monthYear === selectedMonth;
        });

  const handleImageClick = (src) => {
    setFullScreenImage(src);
  };

  const handleFullScreenClose = () => {
    setFullScreenImage(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <img
        className="w-full h-[50vh] md:h-[60vh] object-cover"
        src="https://mediabbwssviii.sgp1.cdn.digitaloceanspaces.com/image/WhatsApp%20Image%202024-10-25%20at%2015.11.43.jpeg"
        alt="Call center picture"
      />
      <section className="p-10">
        <h1 className="text-2xl font-bold text-indigo mb-6">Galeri</h1>
        <DropdownSelect
          className="w-[200px] p-2 border rounded-md mb-5"
          data={[
            { value: "all", label: "All Months" },
            ...photoMonths.map((month) => ({ value: month, label: month })),
          ]}
          defaultValue="all"
          name="monthSelect"
          placeholder="Select a month"
          emptyState="No months available"
          onChange={handleMonthChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPhotos.length > 0 ? (
            filteredPhotos.map((item, index) => (
              <PhotoCard
                key={index}
                src={item.url}
                onImageClick={handleImageClick}
                description={item.description}
                date={new Date(item.createdAt).toLocaleDateString("default", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })} // Format the createdAt date
              />
            ))
          ) : (
            <p>No photos available for the selected month.</p>
          )}
        </div>

        {fullScreenImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={handleFullScreenClose}
          >
            <img
              src={fullScreenImage}
              className="max-w-[800px] max-h-[500px] rounded-sm"
              alt="Full Screen"
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default GaleriPage;
