import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Track } from "./pages/Track";
import { TrackCalendar } from "./pages/TrackCalendar";
import { TrackReading } from "./pages/TrackReading";
import { Timer } from "./pages/Timer";
import { Discover } from "./pages/Discover";
import { Plan } from "./pages/Plan";
import { Profile } from "./pages/Profile";
import { BookDetails } from "./pages/BookDetails";
import { CreateReview } from "./pages/CreateReview";
import { EditProfile } from "./pages/EditProfile";
import { VideoReview } from "./pages/VideoReview";
import { AIChat } from "./pages/AIChat";
import { ChatHistory } from "./pages/ChatHistory";
import { ReviewsPage } from "./pages/ReviewsPage";
import { CreateReviewChoice } from "./pages/CreateReviewChoice";
import { CreateVideoReview } from "./pages/CreateVideoReview";
import { CreateWrittenReview } from "./pages/CreateWrittenReview";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/track-reading",
    Component: TrackReading,
  },
  {
    path: "/track",
    Component: TrackCalendar,
  },
  {
    path: "/track/:day",
    Component: Track,
  },
  {
    path: "/timer",
    Component: Timer,
  },
  {
    path: "/discover",
    Component: Discover,
  },
  {
    path: "/plan",
    Component: Plan,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/edit-profile",
    Component: EditProfile,
  },
  {
    path: "/ai-chat",
    Component: AIChat,
  },
  {
    path: "/ai-chat/:chatId",
    Component: AIChat,
  },
  {
    path: "/chat-history",
    Component: ChatHistory,
  },
  {
    path: "/create-review-choice/:bookId",
    Component: CreateReviewChoice,
  },
  {
    path: "/book/:bookId/reviews",
    Component: ReviewsPage,
  },
  {
    path: "/book/:bookId/create-video-review",
    Component: CreateVideoReview,
  },
  {
    path: "/book/:bookId/create-written-review",
    Component: CreateWrittenReview,
  },
  {
    path: "/book/:id",
    Component: BookDetails,
  },
  {
    path: "/book/:id/review",
    Component: CreateReview,
  },
  {
    path: "/book/:id/video-review",
    Component: VideoReview,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);