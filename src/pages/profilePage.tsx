import React from 'react';
import StyledSafeAreaView from "@/src/shared/StyledSafeAreaView";
import StyledText from "@/src/shared/StyledText";
import PageLayout from "@/src/shared/PageLayout";

const ProfilePage = () => {
    return (
        <PageLayout
            headerRender={() => <StyledText>profile</StyledText>}
            bodyRender={() => <StyledText>profile</StyledText>}
        />
    );
};

export default ProfilePage;