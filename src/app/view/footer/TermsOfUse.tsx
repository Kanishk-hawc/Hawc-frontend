import React, { useState } from 'react';

const TermsOfUse: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const sections = [
    {
      title: "Access and Registration",
      content: `If You're an individual You must be at least 18 (eighteen) years of age, or, if You are between the ages of 13 and 18, You must have Your parent or legal guardian's permission to use the Platform. By using the Platform, You are, through Your actions, representing and warranting to us that You have obtained the appropriate consents/permissions to use the Platform. If You are under the age of 13 years or 16 years (depending on your country of reisdence), You may neither use our Platform in any manner nor may You register for any content or services offered therein.`
    },
    {
      title: "License to Use",
      content: `You are granted a limited, non-exclusive license to access and view the Content on the Platform for Your own personal, non-commercial use only. Further, if so allowed on the Platform, You may temporarily download one copy of any downloadable Content [including Creator Content (defined below)] on the Platform for personal and non-commercial transitory viewing only.`
    },
    {
      title: "Communications",
      content: `The Platform includes provision and facilitation of Public Forums designed to enable You to communicate with us and other registrants to the Content You have registered for. As stated above, use of these Public Forums are completely your choice and by registering for a Content, you are not obligated to participate in the Public Forum.`
    },
    {
      title: "Code of Conduct",
      content: `You agree to the following: Legitimate usage of the Platform, No harmful or dangerous content, No hateful or defamatory content, Violent and graphic content, Harassment and bullying, Spam, Scams, Privacy violation, Impersonation, Unauthorized Access or Disabling of Platform. If any violation of the above rules of conduct comes to our notice, then, we reserve the right to refuse Your access to the Platform, terminate accounts or remove such violating content at any time without notice to You.`
    },
    {
      title: "Intellectual Property",
      content: `We own all information and materials, including Content and Creator Content (in whatever form or media) provided or communicated to You by or on behalf of us including but not limited to, the Platform, trademarks, trade dress, logos, wordmarks, illustrations, letters, images, ideas, concepts, the layout, design, flow, look and feel of the Platform, logos, marks, graphics, audio files, video files, any software which is owned by or licensed to us, instructions embedded in any form of digital documents and other data, information, or material made available to You by us.`
    },
    {
      title: "Feedback",
      content: `If You submit suggestions, ideas, comments, or questions containing product feedback about any Content, the Platform or any part thereof, either through the Public Forum or otherwise, then You grants to us a worldwide, non-exclusive, royalty-free, perpetual, and irrevocable right to use (and full right to sublicense), reproduce, modify, adapt, publish, translate, create derivative works from, distribute, transmit, and display such Feedback in any form.`
    },
    {
      title: "Payments and Refunds",
      content: `To register/enrol for any Content, You may need to pay a fee as may be applicable. Please refer to our Platform to know the pricing. Payment of such Content Fee shall be processed through third-party payment processors. Your payments may be subject to applicable taxes, so we suggest that You read terms and policies of of such third party payment processors to understand the same better. Once You purchase access to a Content on the Platform, the same cannot be cancelled and there shall be no refund of the Content Fee, unless otherwise stated in our Refund Policy.`
    },
    {
      title: "Disclaimer",
      content: `THE PLATFORM IS PROVIDED TO YOU "AS IS" AND "AS AVAILABLE" AND WITH ALL FAULTS AND DEFECTS WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, THE CREATOR, ON ITS OWN BEHALF AND ON BEHALF OF ITS AFFILIATES AND ITS AND THEIR RESPECTIVE LICENSORS AND SERVICE PROVIDERS, EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, WITH RESPECT TO THE PLATFORM, INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT, AND WARRANTIES THAT MAY ARISE OUT OF COURSE OF DEALING, COURSE OF PERFORMANCE, USAGE OR TRADE PRACTICE.`
    },
    {
      title: "Limitation of Liability",
      content: `In no event shall the Creator be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the Content or any other materials on the Platform, even if the Creator or any authorized personnel of the Creator has been notified orally or in writing of the possibility of such damage. Some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, so, some or all of these limitations may not apply to You.`
    },
    {
      title: "Indemnity and Release",
      content: `You shall indemnify and hold harmless the Creator and where applicable, its officers, directors, agents and employees, from any claim or demand, or actions including reasonable attorney's fees, made by any third party or penalty imposed due to or arising out of Your breach of this Agreement or any document incorporated by reference, or Your violation of any law, rules, regulations or the rights of a third party.`
    },
    {
      title: "Links to Third Party Website",
      content: `Creator has not reviewed all of the sites linked to its Platform and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by the Creator of such site. Use of any such linked website is at the Your own risk.`
    },
    {
      title: "Governing Law and Jurisdiction",
      content: `Any claim relating to the Platform shall be governed by the laws of the Creator's home jurisdiction (as provided on the Platform) without regard to its conflict of law provisions. You agree, as we do, to submit to the exclusive jurisdiction of the courts at Creator's home jurisdiction.`
    },
    {
      title: "Miscellaneous",
      content: `We reserve the right to make changes to our Platform, policies, and this Agreement at any time. If You breach these conditions and we take no action, we will still be entitled to use our rights and remedies in any other situation where You breach these conditions. You may not assign or transfer this Agreement, by operation or law or otherwise. Any attempt by You to assign or transfer this Agreement will be null and void.`
    },
    {
      title: "Contact Us",
      content: `If You've have concerns or queries regarding this Agreement, You may write to us by email at Hawc.technologies@gmail.com.`
    }
  ];

  const filteredSections = sections.filter(section => 
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    section.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 px-4 bg-white dark:bg-[#091E37] transition-colors duration-300 font-custom">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-1xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">Terms of Use</h1>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="mb-8 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 p-5 rounded-xl shadow-md">
          <p className="mb-4 text-sm">
            These Terms of Use set out the terms and conditions for use of this Platform and any content, Public Forums, or services offered on or through the Website and/or through any mobile application.
          </p>
          <p className="text-base">
            By accessing this Platform, You are agreeing to be bound by the terms of this Agreement, all applicable laws and regulations. If You disagree with any part of this Agreement or do not wish to be bound by the same, then please do not use the Platform in any manner.
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search terms..."
              className="w-full p-3 text-base border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="space-y-8">
          {filteredSections.length > 0 ? (
            filteredSections.map((section, index) => (
              <div key={index} id={`section-${index}`} className="pt-6 pb-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <h2 className="text-sm font-bold mb-4 text-gray-900 dark:text-white">
                  {index + 1}. {section.title}
                </h2>
                <div className="text-gray-800 dark:text-gray-200 space-y-4 text-base leading-relaxed">
                  <p>{section.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl text-gray-700 dark:text-gray-300">No matching terms found. Try a different search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;