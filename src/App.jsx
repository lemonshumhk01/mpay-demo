import { useRef, useMemo } from 'react';
import './App.css';
import axios from 'axios';
import * as fns from 'date-fns';

const merchantId = '1100539';
const secureKey = '';
const merchantTid = '001';
const salt = 'faeXoo2eehu1oit8';

const generateHash = (params) => {
  let text = '';

  for (const key in params) {
    const v = params[key];
    if (!v) continue;
    text = text.concat(v);
  }

  return `${salt};${text};${secureKey}`;
};

function App() {
  const ref = useRef();

  const generateOrderNo = useMemo(() => {
    return window.crypto.randomUUID();
  }, []);

  const submitPayment = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(ref.current);
      const body = {};
      for (const pair of formData.entries()) {
        const l = pair[0];
        const v = pair[1];
        body[l] = v;
      }

      const hash = generateHash(body);

      body.hash = hash;

      await axios.post('http://localhost:3001/payment', body);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="App">
      <div className="card">
        <form onSubmit={submitPayment} ref={ref}>
          <label htmlFor="salt">Salt</label>
          <input id="salt" name="salt" type="text" defaultValue={salt} />
          <label htmlFor="version">Version</label>
          <input id="version " type="text" name="version" defaultValue="5.0" />
          <label htmlFor="merchantid">Merchant ID</label>
          <input id="merchantid" name="marchantid" defaultValue={merchantId} />
          <label htmlFor="store_id">Store ID</label>
          <input id="store_id" name="store_id" type="text" defaultValue={'1'} />
          <label htmlFor="merchant_tid">Merchant Terminal ID</label>
          <input id="merchant_tid" name="merchant_tid" type="text" defaultValue={merchantTid} />
          <label htmlFor="ordernum">Order number</label>
          <input id="ordernum" name="ordernum" defaultValue={generateOrderNo} />
          <label htmlFor="datetime">Datetime</label>
          <input id="datetime " name="datetime" defaultValue={fns.format(new Date(), 'yyyyMMddHHmmss')} />
          <label htmlFor="amt">Amt (Amount)</label>
          <input id="amt" name="amt" type="number" />
          <label htmlFor="currency">Currency</label>
          <select id="currency" name="currency" defaultValue="HKD">
            <option value="HKD">HKD</option>
            <option value="RMD">RMB</option>
            <option value="USD">USD</option>
          </select>
          <label htmlFor="paymethod">Payment method</label>
          <select id="paymethod" name="paymethod">
            <option value={'0'}>Choose at mPay side</option>
            <option value={'5'}>Alipay CN - PC</option>
            <option value={'35'}>Alipay HK - PC</option>
            <option value={'70'}>Visa/Mastercard - PC</option>
          </select>
          <label htmlFor="customizeddata">Remark message</label>
          <textarea rows="5" id="customizeddata" name="customizeddata" />
          <label htmlFor="returnurl">Return URL</label>
          <input id="returnurl" name="returnurl" defaultValue={window.location.href} />
          <label htmlFor="notifyurl">Notiy URL</label>
          <input id="notifyurl" name="notifyurl" />
          <label htmlFor="accounttype">Account type</label>
          <select id="accounttype" name="accountype" defaultValue={'V'}>
            <option value={'V'}>Visa</option>
            <option value={'M'}>Mastercard</option>
          </select>
          <label htmlFor="customerid">customer ID</label>
          <input id="customerid" name="customerid" />
          <label htmlFor="tokenid">Token ID</label>
          <input id="tokenid" name="tokenid" />
          <label htmlFor="recuruint">recurunit</label>
          <select id="recuruint" name="recuruint">
            <option value="M">Month</option>
          </select>
          <label htmlFor="recurinterval" defaultValue="1">
            recurinterval
          </label>
          <select>
            <option value="1">1 - every month</option>
            <option value="3">3 - every 3 months</option>
          </select>
          <label htmlFor="recurstartdate">recurstartdate</label>
          <input id="recurstartdate" name="recurstartdate" />
          <label htmlFor="recurenddate">recurenddate</label>
          <input id="recurenddate" name="recurendate" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
