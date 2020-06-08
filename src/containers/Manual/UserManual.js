import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import step1 from '../../assets/files/step1.jpg';
import step3 from '../../assets/files/step3-location.jpg';
import space from '../../assets/files/space.jpg';
import reviewer from '../../assets/files/reviewer.jpg';
import location from '../../assets/files/location.jpg';
import compliance from '../../assets/files/compliance.jpg';
import addnewuser from '../../assets/files/add-new-user.jpg';
import CssBaseline from '@material-ui/core/CssBaseline';

class UserManual extends Component {
    render() {
        return (
            <main>
                <CssBaseline/>
                <Paper style={{margin: "48px", padding: "24px"}}>
                    <Grid container spacing={96}>
                        <div className="main_content" style={{zIndex: 1, position: 'relative'}}>
                            <section>
                                <header>
                                    <div className="headlogo" align="center"><a href="#"><img
                                        src="./static/media/logo.018b068a.png"
                                        className="logo"/></a>
                                    </div>
                                </header>

                                <div className="headlogomobile" align="center" style={{marginLeft: '-20px'}}>
                                    <div style={{
                                        backgroundColor: 'white !important',
                                        paddingTop: '10px',
                                        paddingBottom: '20px',
                                        marginBottom: '-30px'
                                    }}>
                                    </div>
                                    {/*<p style={{backgroundColor: '#999999', marginBottom:'50px', zIndex:'0px'}}><a*/}
                                    {/*href="#step1mobile">Step 1</a> | <a href="#step2mobile">Step 2</a> | <a*/}
                                    {/*href="#step3mobile">Step 3</a> | <a href="#step4mobile">Step 4</a> | <a*/}
                                    {/*href="#step5mobile">Step 5</a>*/}
                                    {/*</p>*/}
                                </div>


                                <div className="headingmobile">
                                    <h1 style={{color: '#6E7074', textAlign: 'center'}}>COMPLIANCELINC USER'S GUIDE</h1>
                                </div>

                                <div id="introtext" className="subheading">

                                    <h3 style={{color: 'black'}}>Introduction</h3>
                                    <p>Compliancelinc is a database and reporting tool that enables you to manage and
                                        monitor
                                        the numerous compliance obligations that must be regularly and consistently
                                        tested
                                        for
                                        applicable properties under National and State Building codes, Australian
                                        Standards
                                        and
                                        legislation.</p>
                                    <p>As the Owner of the property you have obligations under the Building Code of
                                        Australia,
                                        Australian Standards and State Building legislation to ensure that compliance
                                        testing
                                        procedures are completed as per the legislative requirements. If you are a
                                        Managing
                                        Agent or an Owners Corporation Manager, the authority you have with your client
                                        will
                                        have clearly defined responsibilities regarding compliance management.</p>
                                    <p>Failure to undertake compliance testing may have serious consequences not only
                                        for
                                        the
                                        Owner/Manager of the property but also for those people who you invite onto the
                                        property
                                        whether they be employees, contractors, customers or the general public.</p>
                                    <p>Compliancelinc puts you back in control of managing your compliance obligations -
                                        relying
                                        on others to ensure that all of your obligations are fully satisfied could be a
                                        risky
                                        and expensive approach.</p>
                                    <p>Compliancelinc enables you to set up your data and reporting system in a way that
                                        suits
                                        your needs.</p>
                                    <p>Information can be captured and reported at a general level or you may determine
                                        that
                                        your compliance information needs to be held and reported for very specific
                                        spaces
                                        within your property (tenancy, building, floor, tenant, section, common
                                        area).</p>

                                </div>
                            </section>
                            <section>
                                <div className="subheading">
                                    <h3 style={{color: 'black'}}>Administrator</h3>
                                    <p>The Administrator will:
                                        <ul>
                                            <li>Set up Users who will have different access levels</li>
                                            <li>Set up the Locations and Spaces that will use Compliancelinc’s database
                                                &
                                                reporting system
                                            </li>
                                            <li>Select the entity who will be invoiced for Compliancelinc services</li>
                                            <li>Select the compliance categories required for each space within a
                                                location
                                            </li>
                                            <li>Enter/edit the contact details of people who will receive Compliancelinc
                                                alerts
                                                and reports
                                            </li>
                                            <span id="step1mobile"/>
                                            <li>Set up additional Administrators (by location) if required</li>
                                            <li>File certified compliance testing information (provided to your
                                                organisation
                                                by
                                                certifiers) in Compliancelinc’s data warehouse (available to you at all
                                                times)
                                            </li>
                                            <li>Enter the compliance testing results and dates for each selected
                                                compliance
                                                category/measure by space (subject to your Certifier not undertaking
                                                this
                                                task
                                                on your behalf)
                                                <ul>
                                                    <li>* Compliancelinc can also undertake the entry of compliance
                                                        testing data into the system on your behalf; please contact
                                                        Compliancelinc for more information
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </p>
                                </div>
                            </section>
                            <section>
                                <div className="step-section">
                                    <h1 id="step1">STEP ONE</h1>
                                    <p>You have just registered with Compliancelinc and you have signed in under My
                                        Account.</p>
                                    <p>The first page you will see after you have signed in is:</p>
                                    <img className="imagemobile" src={step1} width="100%;"/>

                                    <p>OK, let’s do a quick navigation around this page.</p>
                                    <p>On the left hand side is the main menu.</p>
                                    <p>The menu can be swiped on or off the screen by clicking on the arrow on the right
                                        hand
                                        side of the Compliancelinc logo at the top of the menu. </p>
                                    <p>Let’s start with items listed under Configuration – There are six selections
                                        under
                                        this
                                        heading - User, Company/Landlord, User Activity, Location, Space and Compliance.
                                        This
                                        area is the engine room of Compliancelinc and is where all of the initial setup
                                        occurs.</p>

                                    <h3>MENU ITEM ONE - USER</h3>

                                    <p>This tab allows you to set up all Users on the system. </p>
                                    <p>There are three User types that you can select; Users must be set up by
                                        Location.</p>
                                    <p>All Users have a login and password and their access is logged for your
                                        reference.</p>
                                    <p>Certifiers are set up under each Compliance category given you will only want
                                        them to
                                        enter compliance testing results for the specific categories that they are
                                        managing.
                                        <ul>
                                            <li>Administrator</li>
                                        </ul>
                                    </p>

                                    <p>These are individuals, like yourself, who have full access to the system. More
                                        than
                                        one
                                        Administrator can be set up for your Account. It could be that you want
                                        different
                                        Administrators by Region or different locations or you may have segmented your
                                        company
                                        into different groups of properties that require a separate Administrator. </p>
                                    <p>Alternatively, you may need to set up a temporary Administrator if someone goes
                                        on
                                        leave.</p>
                                    <p>Administrators manage and set up all of the information on Compliancelinc – User
                                        set
                                        up
                                        including those who will receive alerts, Location & Spaces that will have
                                        specific
                                        compliance testing undertaken, selection of applicable Compliance categories and
                                        the
                                        data entry of compliance testing information (if not completed by others).</p>


                                    <h3>MANAGER</h3>
                                    <p>Is the generic title for someone in your organisation who is responsible for the
                                        Location.</p>
                                    <p>Manager could be – Business, Region or Territory Manager, Property, Asset or
                                        Owners
                                        Corporation Manager, Facilities or Operations Manager.</p>
                                    <p>Managers do not have permission to add, change or delete any information on
                                        Compliancelinc.</p>
                                    <p>We will produce reports for the Locations that the Manager is responsible for;
                                        reports
                                        can be found on the menu selection “Dashboard – Reports”.</p>
                                    <p>The Manager will also receive alerts if any compliance measure is
                                        non-compliant.</p>

                                    <h3>REVIEWER</h3>

                                    <p>Is anyone who you would like to provide access to, enabling them to review
                                        information on
                                        the Compliancelinc system - Locations, Spaces, Reports under one or more
                                        Managers.
                                        They
                                        could be Owners, Senior Managers. Reviewers do not have the ability to add,
                                        change
                                        or
                                        delete any information.</p>
                                    <p>All Users who have access under your Account, will be listed by User category on
                                        the
                                        opening page when you log in.</p>
                                    <img className="imagemobile"
                                         src={reviewer}
                                         width="100%;"/>


                                    <h3>MENU ITEM TWO – COMPANY/LANDLORD</h3>
                                    <p>This is the area where you set up your account details. This information may be
                                        used
                                        for
                                        Compliancelinc invoicing (if not sent to the Location entity) and contacting you
                                        if
                                        required.</p>
                                    <p>You can easily update this information.</p>


                                    <h3>MENU ITEM THREE – USER ACTIVITY</h3>
                                    <p>This page enables the Administrator to see the user activity on Compliancelinc.
                                        This
                                        may
                                        be valuable in checking who is actively using the Compliancelinc system and
                                        managing
                                        system alerts.</p>


                                    <h3>MENU ITEM FOUR - LOCATION</h3>
                                    <p>A Location is the generic name for the property you wish to monitor compliance
                                        information.</p>
                                    <p>When you create a new Location you will set up the identifying information for
                                        that
                                        Location.</p>
                                    <p>Name, address and the entity name that owns the location (this will be the name
                                        that
                                        will
                                        receive Compliancelinc subscription invoices unless otherwise nominated by
                                        you).</p>
                                    <p>You will also be required to select the Location Type; to save you time the
                                        Location
                                        type
                                        will enable us to list our suggested compliance categories that may be
                                        applicable
                                        for
                                        your Location. Please discuss the Location’s compliance category requirements
                                        with
                                        your
                                        certifier or service provider.</p>
                                    <p>On the far right hand side of the Location page summary there is an action
                                        “Assign”</p>
                                    <p>By clicking on the Assign icon you will be able to revoke and add access to
                                        different
                                        Users.</p>
                                    <img className="imagemobile"
                                         src={location}
                                         width="100%;"/>


                                    <h3>MENU ITEM FIVE – SPACE</h3>
                                    <p>A Space is an area that you want to compile specific compliance information for.
                                        It
                                        should reflect the compliance reporting needs and type of business that operates
                                        from
                                        the Location.</p>
                                    <p>It could be a tenancy, section of a building or a room, common area, floor level,
                                        a
                                        tenant - you determine what a Space is.</p>
                                    <p>By selecting the Location filter, you can list the Spaces under one Location.</p>
                                    <p>There is also a provision for you to add a description and an “Action” icon to
                                        enable
                                        you
                                        to edit the information if required.</p>
                                    <img className="imagemobile" src={space}
                                         width="100%;"/>


                                    <h3>MENU ITEM SIX – COMPLIANCE</h3>
                                    <p>This is the area where you select the compliance categories for your
                                        Location.</p>
                                    <p>By selecting a Location Type, we have listed compliance categories that may be
                                        applicable
                                        for your location. If you choose Location Type “All” the full list of compliance
                                        categories will be displayed for your selection.</p>
                                    <p>Please refer to previous compliance reports that you have received from your
                                        Certifier to
                                        assist you in selecting applicable categories.</p>
                                    <p>However, we would suggest that prior to discussing applicable categories or
                                        measures
                                        with
                                        your Certifier that you refer to the Legislative/Australian Standards
                                        information to
                                        better understand the compliance requirements.</p>
                                    <p>You can access this information by:</p>
                                    <span id="step2mobile"/>
                                    <p>Clicking on <strong>COMPLIANCE</strong> under the <strong>DASHBOARD</strong>
                                        menu,
                                        clicking on the <strong>“Add results and view History”</strong> tab for your
                                        chosen
                                        measure.</p>
                                    <p>The relevant measure detail description is listed for your reference, there is
                                        also a
                                        link to the legislation or Australian standard. </p>
                                    <p>We have included National & State Building code legislation and Australian
                                        Standards
                                        as a
                                        reference point if required. Compliancelinc will update legislative information
                                        and
                                        Standards when changes occur. </p>
                                    <p>For compliance categories that are not currently included in your testing regime,
                                        but
                                        on our suggested listing, please discuss
                                        with a Service provider or Certifier to check if they may be applicable for your
                                        Location. </p>
                                </div>
                            </section>
                            <section>
                                <div className="step-section">
                                    <h1 id="step2">STEP TWO</h1>
                                    <p>Let’s start setting up the different Users you would like to give Compliancelinc
                                        access
                                        to.</p>


                                    <h3>ADD NEW USER</h3>
                                    <p>New Users can be listed under your Account by clicking on the “Add New User”
                                        tab.</p>
                                    <p>Just add the new User’s information, select the Account Type (drop down menu) –
                                        you
                                        will
                                        have a choice of one of three selections – Administrator, Manager and
                                        Reviewer.</p>
                                    <p>Initially you will create the New User’s password, once the User logs into
                                        Compliancelinc
                                        they can go into the Profile tab on the Menu and change their password. </p>
                                    <p>Once completed press the “Create User” tab and a new user will be created.</p>
                                    <p>To add another New User, just click the tab and the fields will be cleared
                                        enabling
                                        you
                                        create a new User.</p>
                                    <img className="imagemobile"
                                         src={addnewuser} width="100%;"
                                    />
                                    <span id="step3mobile"/>

                                </div>
                            </section>
                            <section>
                                <div className="step-section">
                                    <h1 id="step3">STEP THREE – LOCATION</h1>
                                    <p>Now you are ready to start setting up your Locations.</p>
                                    <p>Remember a Location is the property that requires compliance testing under either
                                        State
                                        or National Building Code legislation.</p>
                                    <p>The first screen you will see will be a summary of all Locations under your
                                        Account,
                                        you
                                        can filter the list of Locations by Company Type via the drop-down menu.</p>
                                    <img className="imagemobile"
                                         src={step3}
                                         width="100%;"/>

                                    <p>The Location address and Location Type are listed for your reference. </p>
                                    <p>If you want to Edit any Location just click on the icon on the right hand side of
                                        the
                                        page. If you want to delete this location just click on the trash icon.</p>
                                    <p>When you’re ready to add a new Location press the tab “Add New Location” and you
                                        can
                                        enter the name and address details. </p>
                                    <span id="step4mobile"/>
                                    <p>Last step is to choose the Location Type – this will allow Compliancelinc to list
                                        the
                                        suggested compliance categories for the Location.</p>
                                    <p>Once you have entered the above information, press the “Create User”tab and your
                                        Location information will be saved.</p>
                                    <p>You can add as many Locations as you require.</p>
                                </div>
                            </section>
                            <section>
                                <div className="step-section">
                                    <h1 id="step4">STEP FOUR – SPACE</h1>
                                    <p>The first screen you will see will be a summary of all Spaces under your Account;
                                        you
                                        can
                                        filter the list of Spaces by Location via the drop-down menu.</p>
                                    <p>If you wish to Edit the details of the Space just click on the Action Icon.
                                        Alternatively
                                        if you wish delete the Space just click the “Trash” Icon.</p>
                                    <p>Company Name – Is the name of the Owner of the Location</p>
                                    <p>Location – Is the name of the Location entered when you set up the Location</p>
                                    <p>Space name – is the primary way you would like to identify the space, it could be
                                        the
                                        Tenant’s name, or the space identifier that you use in your business or a
                                        specific
                                        area
                                        name – it’s your choice.</p>
                                    <p>Description – Is further information that you would like to use to describe the
                                        space, it
                                        could be a tenancy number, a floor level, again it’s your choice.</p>
                                    <span id="step5mobile"/>

                                    <p>We would recommend that you are consistent in the way you set up your Spaces &
                                        Description names.</p>
                                    <p>When you’re ready, click on the Add Space tab and complete the details as
                                        described
                                        above. Once completed, to add another just click the Add Space tab; the previous
                                        space details that you added will be saved.
                                    </p>
                                    <p>You can add as many Spaces as you require.</p>
                                </div>
                            </section>
                            <section>
                                <div className="step-section">
                                    <h1 id="step5">STEP FIVE – COMPLIANCE</h1>
                                    <p>This is the stage where you start setting up the compliance categories for the
                                        Spaces
                                        you
                                        have created.</p>
                                    <p>Remember you will normally only have to do this once. Once set up you will only
                                        have
                                        to
                                        make a change if the legislation changes or your Certifier updates the
                                        compliance
                                        requirements.</p>
                                    <p>We have provided a suggested list, but please refer to your Certifier or Service
                                        provider
                                        for advice if you are unsure as to which categories apply to your Space. We have
                                        included reference to the Legislation and Australian Standards</p>

                                    <p>The first screen you will see will have four drop down menus (the system will
                                        populate
                                        Company, Location)
                                        <ul>
                                            <li>Company – select the entity of the Location</li>
                                            <li>Location Type – select the location type of the of the Location</li>
                                            <li>Space – select the Space that you wish to list compliance categories
                                                under
                                            </li>
                                            <li>Type – default “All”, will list compliance categories for your selection
                                            </li>
                                        </ul>
                                    </p>

                                    <p>Once you have completed the above steps, the next page that will be shown is
                                        Compliance
                                        Category selection page.
                                        <ul>
                                            <li>First step is to click on the Compliance Category drop down menu.</li>
                                            <li>A list of all compliance categories that may be applicable for your
                                                Space
                                                will
                                                be listed.
                                            </li>
                                            <li>The full list is provided under the Location Type – “All”.</li>
                                            <li>If you would like to list all of the compliance categories under your
                                                Space
                                                just
                                                click on the Location name on the menu bar, click on the Icon on the far
                                                right
                                                of the page. You will then be taken to the Location set up page which
                                                will
                                                allow
                                                you to change the Location Type to Other. Press Update Location.
                                            </li>
                                            <li>You can then return to the compliance page by clicking on the compliance
                                                name on
                                                the menu, select the Location and Space name again and you are back
                                                where
                                                you
                                                started.
                                            </li>
                                        </ul>
                                    </p>

                                    <p>You have now set up the Location, Space and Compliance types for your
                                        property.</p>
                                    <p>You are now ready to select the compliance category and applicable measures for
                                        the
                                        Space.</p>
                                    <img className="imagemobile"
                                         src={compliance}
                                         width="100%;"/>

                                    <p>To add compliance categories under your Space, click on the name.</p>
                                    <p>Listed under the compliance category name will be a list of compliance measures
                                        under
                                        the
                                        compliance category.</p>
                                    <p>Again, to select the relevant measure for your Space click on the name or click
                                        “add
                                        all
                                        items” and all the measures will be added.</p>
                                    <p>Each selected measure will be listed and provision for entering the Certifier’s
                                        email
                                        address will be provided.</p>
                                    <p>Compliancelinc will send an email to your Compliance Certifier with information
                                        necessary
                                        to register and become a Compliancelinc User. This will allow them to enter
                                        testing
                                        results directly into Compliancelinc for the specific category and Location that
                                        you
                                        have nominated them for.</p>

                                    <h3>DASHBOARD – COMPLIANCE</h3>
                                    <p>This section of Compliancelinc is the area where the compliance testing
                                        information
                                        is
                                        entered and where the legislative reference data is stored.</p>
                                    <p>First step is to select:-</p>
                                    <p>Company – Owner entity of the Location. (remember an Owner entity may own several
                                        Locations)</p>
                                    <p>Location – Drop down menu of Locations to be selected</p>

                                    <p>Space – Drop down menu of Spaces to be selected</p>
                                    <p>Alternatively if you want to see all Spaces and a summary of the compliance
                                        categories
                                        and measures selected, together with the required testing frequencies just
                                        select
                                        “All”
                                        under the Space drop down menu</p>
                                    <p>Each compliance category listed will detail the applicable:-
                                        <ul>
                                            <li>Compliance category</li>
                                            <li>Measure - the item that requires compliance testing</li>
                                            <li>Frequency – intervals of times the compliance measure needs to be tested
                                                or
                                                reviewed
                                            </li>
                                            <li>Current Status of testing</li>
                                            <li>Due - Date that the next compliance test is due</li>
                                        </ul>
                                    </p>


                                    <p>Testing information for each Measure and frequency is entered in the final
                                        Actions
                                        tab –
                                        <strong>“Add Results and View History”</strong>
                                        <p>
                                        </p><strong>Remember</strong>
                                        <p>
                                        </p>p>Certifier is the qualified individual or organisation that undertakes the
                                        compliance testing for the applicable compliance category that you have
                                        selected for the Location.
                                        <p>
                                        </p><strong>Ideally they are the ones that enter the compliance
                                            testing information directly into the Compliancelinc
                                            system.</strong>
                                        <p>
                                        </p>They will also file relevant documents and photographs on
                                        Compliancelinc to be stored under the specific Location
                                        they apply to. Certifiers only have authority to enter
                                        testing information for their compliance categories,
                                        they cannot change categories, measures or frequencies.
                                        Certifiers will receive email alerts (if nominated by
                                        you) when a compliance measure requires testing.
                                        <p>
                                        </p>If your Certifier is also your Service provider,
                                        the alert will also advise them that an item may
                                        need repair or rectification. The Administrator
                                        will also receive an alert which will enable
                                        them to action a purchase/work order to your
                                        service provider
                                        <p>
                                        </p><strong>Once you click on “Add results
                                            and History”</strong> This section is
                                        broken up into four areas
                                        <ul>
                                            <li><strong>Measure Details</strong>
                                            </li>
                                        </ul>
                                    </p>

                                    <p>This page summarises all of the relevant
                                        information regarding the specific
                                        measure that is to be tested, including
                                        Location & Space information and
                                        legislative references with a link to
                                        the respective legislative reference.
                                        <ul>
                                            <li><strong>Add Results</strong>
                                            </li>
                                        </ul>
                                    </p>


                                    <p>Is where your Certifier nominates whether
                                        the specific measure has passed or
                                        failed the compliance test and the date
                                        that the test was completed. Information
                                        can also be added by the Administrator
                                        or Compliancelinc on your behalf.</p>
                                    <p><strong>Remember to upload the compliance
                                        certifier’s document that summarises the
                                        testing results to provide verification
                                        that the testing has been completed and
                                        correctly entered into the
                                        Compliancelinc system</strong></p>
                                    <p>We have also included the provision to
                                        nominate whether the measure is a Non –
                                        Critical Defect or a Critical Defect
                                        <ul>
                                            <li><strong>Compliance
                                                Documents</strong></li>
                                        </ul>
                                    </p>

                                    <p>Is the summary page of all compliance
                                        information that has been filed with
                                        Compliancelinc. </p>
                                    <p>This can be certifier reports,
                                        photographs, purchase/work orders or any
                                        other relevant compliance
                                        information</p>
                                    <p>Information will be retained for 7 years.
                                        Approval will always be required from
                                        the Account Holder before any
                                        information held in storage is discarded
                                        <ul>
                                            <li><strong>Action History</strong>
                                            </li>
                                        </ul>
                                    </p>

                                    <p>Provides a summary of all actions
                                        relating to the compliance testing for
                                        the Location.</p>
                                    <p>The Action history page collates
                                        information from the “Add Results” page
                                        for the Location over time.</p>
                                    <p><strong>REPORTS – MY PORTFOLIO
                                        REPORT</strong></p>
                                    <p>The report function enables you to view
                                        and print reports by
                                        <ul>
                                            <li>Individual Location (with each
                                                Space listed)
                                            </li>
                                            <li>All Locations</li>
                                        </ul>
                                    </p>

                                    <p>Reports are compiled Monthly and you can
                                        select historical monthly reports by
                                        selecting the previous period you
                                        require from the drop down menu “Report
                                        Date”</p>
                                    <p>Report details
                                        <ul>
                                            <li>Report Date</li>
                                            <li>Manager</li>
                                            <li>Location and Company</li>
                                            <li>Space</li>
                                            <li>Compliance category</li>
                                            <li>Measure – with either a Pass or
                                                Fail Status
                                            </li>
                                            <li>Next Due Date</li>
                                        </ul>
                                    </p>

                                    <p>Note: This report can be provided to the
                                        Owner of the Location if required. We
                                        have included the provision for you to
                                        add your logo to personalise the report
                                        to your Company if required.</p>
                                    <p>Report can be produced either by
                                        Compliance category or Space for each
                                        Location.</p>

                                    <h3>SETTINGS</h3>
                                    <p><strong>Profile</strong></p>
                                    <p>This function enables any User to change
                                        their password.</p>

                                    <p><strong>Managing Company</strong></p>
                                    <p>Site messages can be posted on this page
                                        in the event that there is a change to
                                        any compliance legislation or the
                                        Administrator may wish to notify all
                                        Users of a change of policy or inform
                                        them of an important issue.</p>
                                    <p>Company logo is stored on this page and
                                        can be changed if required.</p>

                                </div>
                            </section>
                        </div>
                    </Grid>
                </Paper>
            </main>
        );
    }
}


export default connect(null, null)(UserManual);