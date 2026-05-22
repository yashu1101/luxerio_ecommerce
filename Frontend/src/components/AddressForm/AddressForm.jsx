import { useState, useContext } from "react";
import { CheckoutContext } from "../../Context/CheckoutContext";
import { CheckoutProvider } from "../../Context/CheckoutContext";
import "./AddressForm.css";
export const AddressForm = ({setIsAddressDone}) => {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPin] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  
  const { setAddress } = useContext(CheckoutContext);
  
  // const [addressDone, setAddressDone] = useState(false);
  const handleOnSubmit = (e) => {
    e.preventDefault();

    setAddress({
      fullname,
      phone,
      pincode,
      addressLine,
      city,
      state,
    });
    console.log("Address submitted.");
    setIsAddressDone(true);
  };

  return (
    <div className="address-container">
     

      <form className="address-form" onSubmit={handleOnSubmit}>
        {/* input field for fullname */}
        <input
          onChange={(e) => {
            setFullname(e.target.value);
          }}
          type="text"
          className="address-input-field customer-name"
          name="fullname"
          placeholder="fullname"
          required
        />

        {/* input field for phone */}
        <input
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          type="text"
          className="address-input-field customer-phone"
          name="phone"
          placeholder="phone"
          required
        />
        {/* input field for pin */}
        <input
          onChange={(e) => {
            setPin(e.target.value);
          }}
          type="text"
          className="address-input-field customer-pin"
          name="pincode"
          placeholder="pin"
          required
        />

        {/* input field for address line */}
        <input
          onChange={(e) => {
            setAddressLine(e.target.value);
          }}
          type="text"
          className="address-input-field customer-addressLine"
          name="addressLine"
          placeholder="address line"
          required
        />
        {/* input field for city */}

        <input
          onChange={(e) => {
            setCity(e.target.value);
          }}
          type="text"
          className="address-input-field customer-city"
          name="city"
          placeholder="city"
          required
        />
        {/* input field for city */}

        <input
          onChange={(e) => {
            setState(e.target.value);
          }}
          type="text"
          className="address-input-field customer-state"
          name="state"
          placeholder="state"
          required
        />
       

        <input className="save-address-button" type="submit" value={"SAVE"} />
      </form>
    </div>
  );
};
