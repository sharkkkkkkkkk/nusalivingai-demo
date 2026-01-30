
# NusaLiving AI Features

This project has been enhanced with advanced AI capabilities for the Indonesian Real Estate market.

## New Features

1.  **AI Property Discovery (`/explore`)**
    *   Smart search with keywords (e.g., "BSD", "Jaksel").
    *   **Housing Scoring**: "Zestimate-like" scores for Affordability, Access, Comfort, and Gen Z Fit.
    *   **Lifestyle Insights**: Contextual data about neighborhoods (BSD, Cipete, Depok).

2.  **AI Interior Design (`/design`)**
    *   **Text to Design**: Generate interiors from text descriptions.
    *   **Image to Design**: Upload a photo to get renovation ideas.
    *   **Chat to Visual**: Interactive design assistant.
    *   *Powered by OpenAI DALL-E (Mocked / Real if key provided).*

3.  **Contextual AI Chatbot**
    *   Global chatbot (bottom right).
    *   Understands context (KPR, Design, Legal).
    *   Uses **OpenAI API** for reasoning.
    *   Includes robust **Fallback Logic** if API keys are missing or offline.

## Setup Instructions

### 1. Environment Variables
To enable the "Real" AI features (instead of the smart fallback logic), create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### 2. Testing
*   **Chatbot**: Click the floating icon. Ask "Bagaimana cara KPR BTN?" or "Desain rumah minimalis".
*   **Explore**: Go to "Cari Hunian" (/explore). Search for "BSD" or "Jaksel" to see lifestyle insights.
*   **Design**: Go to "Desain" (/design). Type "Kamar tidur industrial" to generate a visual.

## Architecture
*   **API Routes**: `src/app/api/chat` and `src/app/api/design` handle the server-side logic.
*   **Services**: `src/lib/openai.ts` manages the external API calls.
*   **Mock Data**: `src/lib/mock-data.ts` provides the foundation for the property and insight system.
