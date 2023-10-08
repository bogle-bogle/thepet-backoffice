import styled from 'styled-components';
import { CWidgetStatsF } from '@coreui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const SearchImg = styled.img`
  width: 50px;
  height: 50px;
`;

export const CustomDatePicker = styled(DatePicker)`
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 4px;
  color: #495057;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
`;
