import toast from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";
import { NEW_MESSAGE } from "../Constants/constants";

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else toast.error(error?.data?.message || "something went wrong Message from Useerros ");
      }
    });
  }, [errors]);
}; 

const useAsycMutation = (mutationHook) => {

  const [isLoading, setisLoading] = useState(false);
  const [data, setdata] = useState(null);

  // Main logic starts from here
  const [mutate] = mutationHook();

  const executeMutation = async (toastMessage, ...args) => {
    setisLoading(true);

    const toastId = toast.loading(toastMessage || "updating the data....");

    try {
      const res = await mutate(...args);

      if (res?.data) {
        toast.success(res.data.message || "updated data successfully", {
          id: toastId,
        });
        setdata(res.data);
      } else {
        toast.error(
          res?.error?.data?.message || "Something went wrong in process",
          { id: toastId }
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in useAsycMutation ", {
        id: toastId,
      });
    } finally {
      setisLoading(false);
    }
  };

  return [executeMutation, isLoading, data];
};

const useSocketEvents = (socket, handlers) => {
  useEffect(() => {


    if (!socket) return;

    // ITERATING ON EVENTS
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
          // It is used to listen for a specific events  emitted from Backend 

    });

    //  LISTENING TO THE EVENTS


      // The cleanup function ensure that the evenet listeners are removed when a component is unmounted or when the listeners are no longer needed
    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  },
   [socket , handlers]);
};

 
 
export { useErrors, useAsycMutation , useSocketEvents};
