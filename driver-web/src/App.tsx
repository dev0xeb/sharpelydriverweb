import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './index.css';
import CompanyDriverForm from './components/CompanysDriver/CompanyDriverForm';
import IndividualDriverForm from './components/IndividualDriver/IndividualDriverForm';
import SignUpOptions from './components/SignUpOptions';
import DeliveryFlow from './components/DeliveryFlow';
import SetTarget from './components/set target/setTarget';
import ChatScreen from './components/communicationMeans/ChatScreen';
import CallScreen from './components/communicationMeans/CallScreen';
import OutgoingCallScreen from './components/communicationMeans/OutgoingCallScreen';
import HistoryScreen from './components/HistoryScreen';
import Notifications from './components/Notifications';
import EarnMore from './components/EarnMore';
import ScheduledRides from './components/ScheduledRides';
import DispatchCancelled from './components/DispatchCancelled';
import { WalletPasscode, WalletDashboard, WalletTransferThread } from './components/wallet';
import ProfileScreen from './components/Profile/ProfileScreen';
import AnalysisEarningScreen from './components/analysisEarning/AnalysisEarningScreen';
import TaskUpdateScreen from './components/analysisEarning/TaskUpdateScreen';
import InviteFriends from './components/Profile/InviteFriends';
import NavigationOptions from './components/Profile/NavigationOptions';
import AccountScreen from './components/Profile/AccountScreen';
import AppSettings from './components/Profile/AppSettings';
import VoiceOverSettings from './components/Profile/VoiceOverSettings';
import ThemeSettings from './components/Profile/ThemeSettings';
import LanguageSettings from './components/Profile/LanguageSettings';
import EditProfile from './components/Profile/EditProfile';
import CompanyDriverDocument from './components/CompanysDriver/CompanyDriverDocument';
import BankDetailsEdit from './components/Profile/BankDetailsEdit';

const AccountDocuments: React.FC = () => {
  const navigate = useNavigate();
  return <CompanyDriverDocument onBack={() => navigate(-1)} variant="manage" />;
};

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Navigate to="/options" />} />
        <Route path="/options" element={<SignUpOptions />} />
        <Route path="/company-driver" element={<CompanyDriverForm />} />
        <Route path="/individual-driver" element={<IndividualDriverForm />} />
        <Route path="/dashboard/*" element={<DeliveryFlow />} />
        <Route path="/set-target" element={<SetTarget />} />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/call" element={<CallScreen />} />
        <Route path="/outgoing-call" element={<OutgoingCallScreen />} />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/earn-more" element={<EarnMore />} />
        <Route path="/scheduled-rides" element={<ScheduledRides />} />
        <Route path="/dispatch-cancelled" element={<DispatchCancelled />} />
        <Route path="/analysis" element={<AnalysisEarningScreen />} />
        <Route path="/analysis/tasks" element={<TaskUpdateScreen />} />
        <Route path="/wallet" element={<WalletDashboard />} />
        <Route path="/wallet/passcode" element={<WalletPasscode />} />
        <Route path="/wallet/transfer/:slug" element={<WalletTransferThread />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/profile/invite" element={<InviteFriends />} />
        <Route path="/profile/navigation" element={<NavigationOptions />} />
        <Route path="/profile/account" element={<AccountScreen />} />
        <Route path="/profile/account/documents" element={<AccountDocuments />} />
        <Route path="/profile/account/bank-details" element={<BankDetailsEdit />} />
        <Route path="/profile/settings" element={<AppSettings />} />
        <Route path="/profile/settings/voice-over" element={<VoiceOverSettings />} />
        <Route path="/profile/settings/theme" element={<ThemeSettings />} />
        <Route path="/profile/settings/language" element={<LanguageSettings />} />
      </Routes>
    </div>
  );
}

export default App;
