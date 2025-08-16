import CosmicButton from './CosmicButton';
import { ArrowRight, Heart, Mail, Star } from 'lucide-react';

const CosmicButtonDemo = () => {
  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-indigo-50/30 rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-purple-800 mb-6">
        Cosmic Button Examples
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Primary Buttons */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-purple-700">Primary Buttons</h3>
          
          <CosmicButton variant="primary" size="sm">
            <Star className="w-4 h-4 mr-2" />
            Small Button
          </CosmicButton>
          
          <CosmicButton variant="primary" size="md">
            <Heart className="w-5 h-5 mr-2" />
            Medium Button
          </CosmicButton>
          
          <CosmicButton variant="primary" size="lg">
            <Mail className="w-6 h-6 mr-2" />
            Large Button
          </CosmicButton>
        </div>

        {/* Secondary Buttons */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-purple-700">Secondary Buttons</h3>
          
          <CosmicButton variant="secondary" size="sm">
            <ArrowRight className="w-4 h-4 mr-2" />
            Small Secondary
          </CosmicButton>
          
          <CosmicButton variant="secondary" size="md">
            <Heart className="w-5 h-5 mr-2" />
            Medium Secondary
          </CosmicButton>
          
          <CosmicButton variant="secondary" size="lg">
            <Star className="w-6 h-6 mr-2" />
            Large Secondary
          </CosmicButton>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-purple-700">Action Examples</h3>
          
          <CosmicButton 
            variant="primary" 
            size="md"
            onClick={() => alert('Cosmic button clicked!')}
          >
            Send Message
            <ArrowRight className="w-5 h-5 ml-2" />
          </CosmicButton>
          
          <CosmicButton 
            variant="secondary" 
            size="md"
            onClick={() => alert('Love sent!')}
          >
            <Heart className="w-5 h-5 mr-2" />
            Send Love
          </CosmicButton>
          
          <CosmicButton 
            variant="primary" 
            size="lg"
            className="w-full"
            onClick={() => alert('Getting started!')}
          >
            Get Started
            <Star className="w-6 h-6 ml-2" />
          </CosmicButton>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 p-6 bg-white/50 rounded-lg border border-purple-200/30">
        <h3 className="text-lg font-semibold text-purple-800 mb-4">How to Use</h3>
        <div className="space-y-2 text-sm text-purple-700">
          <p><strong>Basic usage:</strong> {`<CosmicButton>Click me</CosmicButton>`}</p>
          <p><strong>With variant:</strong> {`<CosmicButton variant="secondary">Secondary</CosmicButton>`}</p>
          <p><strong>With size:</strong> {`<CosmicButton size="lg">Large Button</CosmicButton>`}</p>
          <p><strong>With icon:</strong> {`<CosmicButton><Heart className="w-5 h-5 mr-2" />Love</CosmicButton>`}</p>
          <p><strong>With onClick:</strong> {`<CosmicButton onClick={() => alert('Hello!')}>Click me</CosmicButton>`}</p>
        </div>
      </div>
    </div>
  );
};

export default CosmicButtonDemo;