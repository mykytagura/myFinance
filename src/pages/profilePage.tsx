import React from 'react';
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