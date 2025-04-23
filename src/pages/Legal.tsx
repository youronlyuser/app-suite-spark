
import AppLayout from "@/components/AppLayout";

const Legal = () => {
  return (
    <AppLayout title="Privacy & Terms">
      <div className="max-w-3xl mx-auto p-6 bg-gray-800/50 rounded-lg backdrop-blur-sm text-gray-300">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Privacy Policy</h2>
          <p className="mb-4">
            The Productivity Hub application ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our application.
          </p>
          <h3 className="text-xl font-semibold mb-2 text-white">Information Collection</h3>
          <p className="mb-4">
            We only collect and store data locally in your browser's local storage. This includes:
            - Task lists
            - Kanban board arrangements
            - Timer preferences
            - Clock display preferences
          </p>
          <p className="mb-4">
            We do not collect, store, or transmit any personal information to external servers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Terms of Use</h2>
          <p className="mb-4">
            By using Productivity Hub, you agree to these terms:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>The application is provided "as is" without any warranties.</li>
            <li>You are responsible for any data you input into the application.</li>
            <li>We reserve the right to modify or discontinue the service at any time.</li>
            <li>You agree to use the application only for lawful purposes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Contact</h2>
          <p>
            For any questions about these terms or privacy policy, please reach out through our support channels.
          </p>
        </section>
      </div>
    </AppLayout>
  );
};

export default Legal;
