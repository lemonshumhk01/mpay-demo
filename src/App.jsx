import { useState, useRef } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const ref = useRef();
  const fff = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(ref.current);
      const body = {};
      for (const pair of formData.entries()) {
        const l = pair[0];
        const v = pair[1];
        body[l] = v;
      }

      await axios.post('https://demo.mobiletech.com.hk/MPay/MerchantPay.jsp', body);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="App">
      <div className="card">
        <form onSubmit={fff} ref={ref}>
          version <input type="text" name="version" value="5.0" /> <p></p>
          salt <input type="text" name="salt" value="whi1i7lifa70yhgs" /> <p></p>
          accounttype <input type="text" name="accounttype" value="V" /> <p></p>
          amt <input type="text" name="amt" value="30.0" /> <p></p>
          currency <input type="text" name="currency" value="HKD" /> <p></p>
          customerid <input type="text" name="customerid" value="12579841156496431634" /> <p></p>
          customizeddata <input type="text" name="customizeddata" value="" /> <p></p>
          datetime <input type="text" name="datetime" value="20180701010100" /> <p></p>
          extrafield1 <input type="text" name="extrafield1" value="" /> <p></p>
          extrafield2 <input type="text" name="extrafield2" value="" /> <p></p>
          extrafield3 <input type="text" name="extrafield3" value="" /> <p></p>
          locale <input type="text" name="locale" value="en_US" /> <p></p>
          merchant_tid <input type="text" name="merchant_tid" value="001" /> <p></p>
          merchantid <input type="text" name="merchantid" value="1100000" /> <p></p>
          notifyurl <input type="text" name="notifyurl" value="https://demo.mpay.com/notify.jsp" /> <p></p>
          ordernum <input type="text" name="ordernum" value="201807000001" /> <p></p>
          paymethod <input type="text" name="paymethod" value="37" /> <p></p>
          recurenddate <input type="text" name="recurenddate" value="" /> <p></p>
          recurinterval <input type="text" name="recurinterval" value="" /> <p></p>
          recurstartdate
          <input type="text" name="recurstartdate" value="" /> <p></p>
          recurunit <input type="text" name="recurunit" value="" /> <p></p>
          returnurl <input type="text" name="returnurl" value="https://demo.mpay.com.hk/return.jsp" /> <p></p>
          storeid
          <input type="text" name="storeid" value="1" /> <p></p>
          tokenid <input type="text" name="tokenid" value="101" /> <p></p>
          hash{' '}
          <input type="text" name="hash" value="0D959AA4CCBF2844B1DB7A3777772203712F31E04BAD9E208CB52BCA11FAF72B" />
          <p></p>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
