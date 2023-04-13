import useDocumentTitle from 'services/DocumentTitle'
import React from 'react'
import "assets/styles/Resources.scss";
import "assets/styles/Terms.scss";
import "assets/styles/PublicWrapper.scss";

export default function Resources(props) {
  useDocumentTitle(props.title)
  return (
  
    <div className = "public-wrapper">
        <p className="intro">
        Welcome to our tips page. Buying, selling, and tracking breastmilk can get overwhelming as a new parent. Having access to reliable and helpful information is essential. Below are some of the vital tips MilkMates came up with for new parents. These tips revolve around storage techniques, proper cleaning, pasteurization and more.By providing access to a wealth of information and resources, a tips page can help ensure a positive and successful experience for all involved in the buying or selling of breastmilk.
      </p>
      <hr></hr>
      <div className="tos">
        <div className="scroll-links">
          <div className="sticky-div">
            <a href="#t1">1. Storage Tips</a>
            <a href="#t2">2. Sanitization of Supplies</a>
            <a href="#t3">3. How to Freeze, Thaw, and Warm Breastmilk </a>
            <a href="#t4">4. Pasteurization</a>
            <a href="#t5">5. Buyer Tips</a>
            <a href="#t6">6. Seller Tips</a>
          </div>
        </div>
        <div className="terms">
          <div className="term" id="t1">
            <h2>1. Storage Tips</h2>
            <p>Below are the different types of breastmilk and the recommended storage times:</p>
            <br></br>
            <p><b>Fresh:</b></p>
            <ul> 
              <li>4 hours in room temperature</li>
              <li>4 days in the fridge</li>
              <li>6-12 months in the freezer</li>
            </ul>
            <br></br>
            <p><b>Previously Frozen:</b></p>
            <ul>
              <li>
                1-2 hours in room temperature
              </li>
              <li>
                1 day in the fridge
              </li>
              <li>
                NEVER refreeze
              </li>
            </ul>
            <br></br>
            <p><b>Leftover from a Feeding:</b></p>
            <ul> 
              <li>Use within 2 hours</li>
              <li>Do NOT refridgerate</li>
              <li>Do NOT refreeze</li>
            </ul>
            
            
          </div>
          <div className="term" id="t2">
            <h2>2. Sanitization of Supplies</h2>
            <p>
              Supplies when breastfeeding include the bottles plus the nipples, rings, and caps that go with them. Some babies may be fed other ways, like with a syringe, medicine cup, spoon, or a different nursing system. It is important to properly clean all items used for feeding. 
            </p>
            <br></br>
            <li><b>Cleaning Items in the Dishwasher</b></li>
            <br></br>
                
                <ul><b>1. Separate All Parts of the Bottle: </b>nipple, rings, caps, valves, etc. to make sure all are able to be properly cleaned.</ul>
                <ul><b>2. Rinse: </b>first run all of the different pieces under water. The water can be either warm or cold, but not too hot.</ul>
                <ul><b>3. Wash:</b> Place the items on the top of the dishwasher since they are made of plastic. If you can, run the dishwashwer using hot water or on a sanitization cycle to make sure all germs are killed.</ul>
                <ul><b>4. Removal:</b> Before removing the items from the dishwasher, make sure to wash your hands with soap and warm water to clean all germs off of your hands. If the items still need to be dried, use a clean dish towel or paper towel so no additional germs are transfered.</ul>

            <br></br>
                <li><b>Cleaning Items by Hand</b></li>
            <br></br>
                
                <ul><b>1. Wash Hands: </b>Wash your hands with soap and warm water for at least 20 seconds prior to cleaning the items. This will enture the germs are off of your hands.</ul>
                <ul><b>2. Disassemble: </b>Separate all of the bottle parts: nipple, rings, caps, valves, etc. to make sure all can be cleaned in full.</ul>
                <ul><b>3. Rinse:</b> Rinse all of the excess formula out of the bottle and other parts to prepare for the cleaning. You can do this in either warm or cold water but do not set them in the sink. </ul>
                <ul><b>4. Wash:</b> Place all of the items in a clean basin or a container that is used only to clean infant feeding items. Do not place the items in the sink because the sink may have germs that could contaminate the different pieces. After you place the items in the container, fill it with hot water and add dish soap. Next, scrub the items using a clean brush that is used solely for infant feeding items or a new brush. Finally, make sure you get water through the nipple holes to insure proper cleaning. </ul>
                <ul><b>4. Rinse Again:</b> Rinse all of the soap off of the bottle and other parts. </ul>
                <ul><b>5. Drying Process:</b> Allow bottle, attachments, water basin, and brush to be air dried. This area needs to be protected from dirt and dust. Do not use a dish towel as it may transfer germs to the items. </ul>
                <ul><b>6. Cleaning the Wash Basin and Brush:</b> It is important to clean the products used to clean the bottle as well. This is because dirt and germs can build up on these products which would allow easy transfer to the bottle and its parts. Make sure to wash them every few days with hot water or in a sanitization cycle in the dish washer. If your baby is less than 2 months old, was born prematurely, or has a weakened immune system due to illness or medical treatment, wash the basin and the brush after every use to ensure clean supplies. </ul>






            
          </div>
          <div className="term" id="t3">
            <h2>3. How to Freeze, Thaw, and Warm Breastmilk</h2>
            <p>
              In the storage tips section above, you can see how long breastmilk lasts in different storage locations. This section will go over how to freeze, thaw, and warm breastmilk properly. 
            </p>
            <br></br>
            <li><b>How to Freeze Breastmilk</b></li>
            <br></br>
                
                <ul><b>1. Use the Proper Container: </b>To freeze breastmilk, it is best to use one of these three containers: glass jars with screw tops, BPA-free platic container with tight lids, or plastic breastmilk storage bags.</ul>
                <ul><b>2. Filling the Container: </b>Only fill each container with 2-4oz of breastmilk as this is the amount babies typically need. You do not want to thaw too much as the leftover needs to be used quickly. Also, make sure you label the bags with the date, amount, and any other information you need.</ul>
                <ul><b>3. Placement in the Freezer:</b> Place the breastmilk storage containers in the back center of the freezer - this is the coldest part of the freezer.</ul>
                <ul><b>4. Awareness:</b> Make sure you are aware of the different dates of breastmilk in your freexer. Breastmilk is best when it is used within 6 months, but it is good for up to 12 months.</ul>
            <br></br>

            <li><b>How to Thaw Breastmilk</b></li>
            <br></br>
                
                <ul><b>1. Fridge: </b>One way to properly thaw breastmilk is to place it in the fridge overnight. This will allow for ample time for the breastmilk to properly thaw.</ul>
                <ul><b>2. Warm Bowl: </b>Another way to properly thaw breastmilk is to place it in a container with warm water. Make sure the water does not go above the rim of the bottle. We do not want the germs from the water or container to get into the breastmilk. Ideally, you will want to use a clean container so the germs do not get on the outside of the bottle either.</ul>
                <ul><b>3. Warm Rinse:</b> The final way to properly thaw a frozen bottle of breastmilk is by holding it under warm water. Once again, make sure the water does not go above the rim of the bottle.</ul>
                <ul><b>4. Awareness:</b> Once thawed, make sure the milk is consumed within 24 hours if stored in the fridge, or consumed within 2 hours of stored at room temperature.</ul>

                <br></br>

            <li><b>How to Warm Breastmilk</b></li>
            <br></br>
                
                <ul><b>1. Water Rinse: </b>One way to properly warm breastmilk is by holding it under warm, running water. Do not let the water go above the rim.</ul>
                <ul><b>2. Warm Bowl: </b>Another way to properly warm breastmilk is by placing the container in a bowl of warm water for a couple of minutes. Do not let the water go above the rim of the bottle.</ul>
                <ul><b>3. Important:</b> Fat rises when the breastmilk is cold so make sure to either gently swirl the bottle to mix the separated layers or squeeze the milk bag to mix them.</ul>

                <br></br>

            <li><b>Do NOT</b></li>
            <br></br>
                
                <ul>1. Do not microwave the bottle or bag to thaw or warm the milk. </ul>
                <ul>2. Do not use hot or boiling water to warm or thaw the milk.</ul>
                <ul>3. Do not refreeze thawed breastmilk - it will last 1 day in the fridge and 1-2 hours in room temperature</ul>
                <ul>4. Do not mix warm or fresh breastmilk with cold or frozen breastmilk. Always chill the breastmilk and then you can mix. </ul>
          

          </div>
          <div className="term" id="t4">
            <h2>4. Pasteurization</h2>
            <p>
              According to the CDC, pasteurization is the process of heating milk to a high enough temperature for enough time to kill harmful germs in the milk. Below are the steps to take to pasteurize the breastmilk. Because we do not yet have a system in place to get milk sent off before it is shipped, we highly recommend you pasteurize the breastmilk you receive. Note: For the best quality, raw milk must be heated slowly during pasteurization.
            </p>
            <br></br>
            <li><b>Pasteurizing the Breastmilk</b></li>
            <br></br>
                
                <ul>1. To start, find a double boiler or place a smaller saucepan inside of a large pan or slow cooker.</ul>
                <ul>2. Put water into the bottom of the pan and bring it to a boil.</ul>
                <ul>3. Pour the raw milk into the top pan and heat it over the boiling water. Make sure to stir the milk constantly.</ul>
                <ul>4. Heat the milk until the temperature reaches 165 degrees farenheit. Hold this temperature from 20-30 minutes in order to fully pasteurize the milk.</ul>
                <ul>5. Remove the milk container and place it in a container of cold water with ice. Continuously stir this milk until the temperature is 40 degrees farenheit.</ul>
                <ul>6. Store the pasteurized milk in the fridge.</ul>
            <br></br>
          </div>
          <div className="term" id="t5">
            <h2>5. Buyer Tips</h2>
            <p>
              Thank you for choosing MilkMates. As a buyer, you have the option to browse through different listings and select the seller and type of milk that meets your specific needs. Each listing includes detailed information about the seller's health and dietary habits, as well as their milk production process, and storage methods. You also have the ability to see the rating of the seller. Below are five important tips we recommend you follow: 
              <br></br>
              <ul>
                <li>1. Look at the rating of the buyer you are purchasing from</li>
                <li>2. Look at the rating of the buyer you are purchasing from</li>
                <li>3. Look at the rating of the buyer you are purchasing from</li>
                <li>4. Look at the rating of the buyer you are purchasing from</li>
                <li>5. Look at the rating of the buyer you are purchasing from</li>
              
              </ul>


            </p>
            <br></br>
            
          </div>

          <div className="term" id="t6">
            <h2>6. Seller Tips</h2>
            <p>
              Our app is provided on an "as is" and "as available" basis,
              without any warranty of any kind, express or implied. We do not
              warrant that our app will be uninterrupted or error-free, that
              defects will be corrected, or that our app or the servers that
              make it available are free of viruses or other harmful components.
              We disclaim all warranties, including but not limited to
              warranties of merchantability, fitness for a particular purpose,
              and non-infringement.
            </p>
          </div>
      </div>
      </div>
      </div>

  )
}
