import React, { useState, useEffect } from 'react';
import {
  LineChart,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  Line,
  ResponsiveContainer,
} from 'recharts';
import { gapi } from 'gapi-script';

const CLIENT_ID =
  '251077242841-18si4lp7q2aufb3uek3hr8sgr2qg6ivu.apps.googleusercontent.com';
const DISCOVERY_DOCS = [
  'https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta',
];
const SCOPES =
  'https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/analytics.readonly';
const PROPERTY_ID = 406873212;

function Product() {
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  // 마운트 될 때 로그인 처리하도록 선언
  useEffect(() => {
    gapi.load('client:auth2', initializeGapi);
  }, []);

  const initializeGapi = () => {
    gapi.client
      .init({
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(() => {
        setLoggedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
      })
      .catch((error) => {
        console.error('gapi client 초기화 실패:', error);
      });
  };

  // login
  const handleLogin = () => {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error('Google 인증 실패: ', error);
      });
  };

  // logout
  const handleLogout = () => {
    gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => {
        setLoggedIn(false);
        setData([]);
      })
      .catch((error) => {
        console.error('로그아웃 중 에러 발생: ', error);
      });
  };
  const handleFetchData = () => {
    gapi.client.analyticsdata.properties
      .batchRunReports({
        property: `properties/${process.env.REACT_APP_GA_PROPERTY_ID}`,
        resource: {
          requests: [
            {
              dimensions: [
                {
                  name: 'date',
                },
              ],
              metrics: [
                {
                  name: 'activeUsers',
                },
                {
                  name: 'sessions',
                },
              ],
              dateRanges: [
                {
                  startDate: '7daysAgo',
                  endDate: 'yesterday',
                },
              ],
            },
          ],
        },
      })
      .then((response) => {
        const { rows } = response.result.reports[0];
        const transformedData = rows.map((row) => ({
          date: row.dimensionValues[0].value,
          activeUsers: parseInt(row.metricValues[0].value, 10),
          sessions: parseInt(row.metricValues[1].value, 10),
        }));
        setData(transformedData);
      })
      .catch((error) => {
        console.error('Error querying data: ', error);
      });
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Google Analytics Data API</h1>
      <div>
        {!loggedIn && <button onClick={handleLogin}>Login with Google</button>}
        {loggedIn && (
          <div>
            <button
              style={{ marginTop: '10px', marginRight: '10px' }}
              onClick={handleFetchData}
            >
              Fetch Data
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      {data.length > 0 && (
        <div style={{ width: '800px', height: '500px' }}>
          <AreaChart
            width={800}
            height={500}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <defs>
              <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorActiveUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="activeUsers"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorActiveUsers)"
            />
            <Area
              type="monotone"
              dataKey="sessions"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorSessions)"
            />
          </AreaChart>
        </div>
      )}
    </div>
  );
}

export default Product;
